function dijkstra(graph, start) {
    // Initialize distances object to store shortest distances
    const distances = {};
    // Initialize priority queue to keep track of vertices to visit
    const queue = new PriorityQueue();
    
    // Initialize distances for all vertices to Infinity, except start vertex to 0
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;
    
    // Enqueue start vertex with priority 0
    queue.enqueue(start, 0);
    
    while (!queue.isEmpty()) {
        // Dequeue vertex with smallest priority
        const currentVertex = queue.dequeue().data;
        
        // Explore neighbors of current vertex
        for (let neighbor in graph[currentVertex]) {
            // Calculate new distance to neighbor through current vertex
            const distance = distances[currentVertex] + graph[currentVertex][neighbor];
            // If new distance is shorter than current distance, update distances and enqueue neighbor
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                queue.enqueue(neighbor, distance);
            }
        }
    }
    
    // Return shortest distances object
    return distances;
}

// Priority queue implementation (using min binary heap)
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        const newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }

    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
    }
}
