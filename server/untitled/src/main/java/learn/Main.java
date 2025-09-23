package learn;

public class Main {
    public static void main(String[] args) {
        int[] array = {1, 2, 3, 4, 5};

        int start = 0;
        int end = array.length - 1;
        for(int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
        System.out.println();
        while(start < end) {
            int temp = array[start];
            array[start] = array[end];
            array[end] = temp;
            start++;
            end--;
        }


        for(int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}