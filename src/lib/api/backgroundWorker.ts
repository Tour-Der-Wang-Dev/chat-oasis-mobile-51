
/**
 * Background worker for handling offline operations and API synchronization
 */

interface QueuedOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  endpoint: string;
  data: any;
  timestamp: number;
  retryCount: number;
}

class BackgroundApiWorker {
  private queue: QueuedOperation[] = [];
  private isProcessing = false;
  private storageKey = 'api_operation_queue';
  private maxRetries = 5;
  
  constructor() {
    // Load any queued operations from localStorage
    this.loadQueue();
    
    // Listen for online status changes
    window.addEventListener('online', this.onOnline.bind(this));
    
    // Check if online and process queue
    if (navigator.onLine) {
      this.processQueue();
    }
  }
  
  /**
   * Add an operation to the queue
   */
  public addToQueue(
    type: 'create' | 'update' | 'delete',
    endpoint: string,
    data: any
  ): string {
    const id = crypto.randomUUID();
    
    const operation: QueuedOperation = {
      id,
      type,
      endpoint,
      data,
      timestamp: Date.now(),
      retryCount: 0
    };
    
    this.queue.push(operation);
    this.saveQueue();
    
    // If we're online, try to process the queue immediately
    if (navigator.onLine && !this.isProcessing) {
      this.processQueue();
    }
    
    return id;
  }
  
  /**
   * Process operations in the queue
   */
  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0 || !navigator.onLine) {
      return;
    }
    
    this.isProcessing = true;
    
    let currentOp = this.queue[0];
    
    try {
      console.log(`Processing operation ${currentOp.id} of type ${currentOp.type}`);
      
      // Process based on operation type
      switch (currentOp.type) {
        case 'create':
          await fetch(currentOp.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentOp.data)
          });
          break;
        
        case 'update':
          await fetch(currentOp.endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentOp.data)
          });
          break;
        
        case 'delete':
          await fetch(currentOp.endpoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          });
          break;
      }
      
      // Operation successful, remove from queue
      this.queue.shift();
      this.saveQueue();
      
    } catch (error) {
      console.error(`Failed to process operation ${currentOp.id}:`, error);
      
      // Increment retry count
      currentOp.retryCount++;
      
      // If we've exceeded max retries, remove the operation
      if (currentOp.retryCount >= this.maxRetries) {
        console.warn(`Operation ${currentOp.id} failed after ${this.maxRetries} attempts. Removing from queue.`);
        this.queue.shift();
      } else {
        // Move to the end of the queue for retry
        this.queue.shift();
        this.queue.push(currentOp);
      }
      
      this.saveQueue();
    } finally {
      this.isProcessing = false;
      
      // If there are more operations, continue processing
      if (this.queue.length > 0) {
        setTimeout(() => this.processQueue(), 1000);
      }
    }
  }
  
  /**
   * When device comes online
   */
  private onOnline() {
    console.log('Device is online. Processing queued operations...');
    this.processQueue();
  }
  
  /**
   * Save queue to localStorage
   */
  private saveQueue() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.queue));
    } catch (error) {
      console.error('Failed to save operation queue:', error);
    }
  }
  
  /**
   * Load queue from localStorage
   */
  private loadQueue() {
    try {
      const savedQueue = localStorage.getItem(this.storageKey);
      if (savedQueue) {
        this.queue = JSON.parse(savedQueue);
      }
    } catch (error) {
      console.error('Failed to load operation queue:', error);
      this.queue = [];
    }
  }
  
  /**
   * Get the current queue
   */
  public getQueue(): QueuedOperation[] {
    return [...this.queue];
  }
  
  /**
   * Clear the queue
   */
  public clearQueue() {
    this.queue = [];
    this.saveQueue();
  }
}

// Create a singleton instance
export const backgroundWorker = new BackgroundApiWorker();

export default backgroundWorker;
