using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ConsoleApp2
{
    public class MinHeap<T>:IEnumerable<T> where T :IComparable<T>   
    {
        private List<T> _heap;
        public MinHeap()
        {
            _heap = new List<T>();  
        }
        public int Count { get { return _heap.Count; } }
        public void Add(T item)
        {
            _heap.Add(item);
            int childIndex = _heap.Count - 1;
            int parentIndex = (childIndex - 1) / 2;
            while(childIndex > 0 && _heap[childIndex].CompareTo(_heap[parentIndex])<0)
            {
                Swap(childIndex,parentIndex);   
                childIndex=parentIndex;
                parentIndex=(childIndex - 1) / 2;
            }
        }
        public void PrintHeap()
        {
            Console.WriteLine("---Heap contents---");
            List<T> heapCopy = new List<T>(_heap);
            while(heapCopy.Count > 0) 
            {
                var item = heapCopy[0];
                Console.WriteLine( item.ToString());
                //הסרת האיבר הראשון מהערימה-פונקציה pop
                heapCopy[0] = heapCopy[heapCopy.Count - 1]; 
                heapCopy.RemoveAt(heapCopy.Count - 1);
                //החזרת הערימה לסדר מינימלי
                int parentIndex = 0;
                int leftChildIndex = 1;
                int rightChildIndex = 2;

                while(leftChildIndex<heapCopy.Count)
                {
                    int minChildIndex=leftChildIndex;
                    if (rightChildIndex < heapCopy.Count && heapCopy[rightChildIndex].CompareTo(heapCopy[leftChildIndex])<0)
                        minChildIndex = rightChildIndex;
                    if (heapCopy[parentIndex].CompareTo(heapCopy[minChildIndex]) <= 0)
                        break;
                    Swap(heapCopy, parentIndex, minChildIndex);
                    parentIndex = minChildIndex;
                    leftChildIndex = parentIndex * 2 + 1;
                    rightChildIndex = parentIndex * 2 + 2;
                }


            }

        } 
        private void Swap(List<T> heap,int index1,int index2)
        {
            T temp = heap[index1];
            heap[index1]= heap[index2];
            heap[index2] = temp;
        }
        public T PeekAndRemove()
        {
            if(Count==0)
                throw new InvalidOperationException("Heap is empty");
            T root = _heap[0];
            _heap[0] = _heap[Count - 1];
            _heap.RemoveAt(0);

            int parentIndex = 0;
            int leftChildIndex = 1;
            int rightChildIndex = 2;
            while(leftChildIndex<Count)
            {
                int minChildIndex=leftChildIndex;
                if (rightChildIndex < Count && _heap[rightChildIndex].CompareTo(_heap[minChildIndex])<=0)
                {
                    minChildIndex = rightChildIndex;    
                }
                if (_heap[parentIndex].CompareTo(_heap[minChildIndex]) <= 0)
                    break;
                Swap(parentIndex, minChildIndex);
                parentIndex = minChildIndex;
                leftChildIndex = parentIndex * 2 + 1;
                rightChildIndex = parentIndex * 2 + 2;
            }
            return root;
        }
        public T Peek()
        {
            if(Count==0)
                throw new InvalidOperationException("Heap is empty");
            return _heap[0];    
        }
        public T Pop()
        {
            if(Count==0)
                throw new InvalidOperationException("Heap is empty");
            T root = _heap[0];
            _heap[0] = _heap[Count - 1];
            _heap.RemoveAt(Count-1);
            int parentindex = 0;
            int leftChildIndex = 1;
            int rightChildIndex = 2;
            while(leftChildIndex<Count)
            {
                int minChildIndex = leftChildIndex;
                if (rightChildIndex < Count && _heap[rightChildIndex].CompareTo(_heap[rightChildIndex]) < 0)
                    minChildIndex = rightChildIndex;
                if (_heap[parentindex].CompareTo(_heap[minChildIndex]) <= 0)
                    break;
                Swap( parentindex, minChildIndex);
                parentindex = minChildIndex;
                leftChildIndex = parentindex * 2 + 1;
                rightChildIndex = parentindex * 2 + 2;  
            }
            return root;
        }
        public void RemoveWhere(Predicate<T> match)
        {
            _heap.RemoveAll(match);
            BuildHeap();
        }
        private void BuildHeap()
        {
            for (int i = Count/2 -1; i>=0; i--)
            {
                Heapify(i);
            }
        }
        private void Heapify(int i)
        {
            int leftChildIndex = i * 2 + 1;
            int rightChildIndex=i*  2 + 2;
            int minIndex = i;
            if (leftChildIndex < Count && _heap[leftChildIndex].CompareTo(_heap[minIndex])<0)
                minIndex= leftChildIndex;
            if (rightChildIndex < Count && _heap[rightChildIndex].CompareTo(_heap[minIndex]) < 0)
                minIndex = rightChildIndex;
            if(minIndex!=i)
            {
                Swap(i, minIndex);
                Heapify(minIndex);
            }
        }
        private void Swap(int index1,int index2)
        {
            T temp= _heap[index1];
            _heap[index1] = _heap[index2];
            _heap[index2] = temp;   
        }
        public override string ToString()
        {
            StringBuilder sb=new StringBuilder();
            sb.AppendLine("--heap contents--");
            foreach (T item in this)
            {
                sb.AppendLine(item.ToString());
            }
            return sb.ToString();   
        }

        public IEnumerator<T> GetEnumerator()
        {
            return _heap.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
