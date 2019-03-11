package com.huicent.server.util;

import java.util.Arrays;
import java.util.Comparator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.lang.ArrayUtils;
public class ChsLogicCmpUtil {

    public static void main(String[] args) {
        // TODO Auto-generated method stub
        //String fileNames[] = { "fss01", "fss2", "fss01_22", "fss3", "fss1", "fss10", "fss20", "fss4", "fss30", "fss21", "fss12","fss01_3" };
        //String fileNames[] = { "MF5828", "SC4790", "MF0528", "M7621", "SC990","M762","MC762"};
        String fileNames[] = { "1190", "890", "1599", "7621", "990","762"};
        //String fileNames[] = {"SC4790","SC990"};

        char chFileNames[][] = new char[fileNames.length][];
        String[] oldSortedNames = new String[fileNames.length];
        for (int i = 0; i < fileNames.length; i++) {
            chFileNames[i] = fileNames[i].toCharArray();
            oldSortedNames[i] = fileNames[i];
        }

        // Arrays.sort(fileNames, StrLogicCmp);
        Arrays.sort(chFileNames, ChsLogicCmpDesc);
        System.out.println("_Random_" + "\t" + "_Tradion_" + "\t" + "_Target_");
        String line;
        for (int i = 0; i < fileNames.length; i++) {
            line = fileNames[i] + (fileNames[i].length() >= 8 ? "\t" : "\t\t");
            line += oldSortedNames[i] + (oldSortedNames[i].length() >= 8 ? "\t" : "\t\t");
            line += new String(chFileNames[i]);
            System.out.println(line);

        }


    }

    public static Comparator<char[]> getOrderType(String order){
        if (order.equals("asc")){
            return ChsLogicCmpAsc;
        }
        if (order.equals("desc")){
            return ChsLogicCmpDesc;
        }
        return null;
    }

    public static char[][] getCharArray(String[] sortArray){
        char chFileNames[][] = new char[sortArray.length][];
        String[] oldSortedNames = new String[sortArray.length];
        for (int i = 0; i < sortArray.length; i++) {
            chFileNames[i] = sortArray[i].toCharArray();
            oldSortedNames[i] = sortArray[i];
        }
        return chFileNames;
    }

    static Comparator<String> StrLogicCmp = new Comparator<String>() {

        @Override
        public int compare(String o1, String o2) {
            // TODO Auto-generated method stub
            return 0;
        }

    };

    // "f01s2s22", "f1s02s2"
     static Comparator<char[]> ChsLogicCmpDesc = new Comparator<char[]>() {
        class Int{
            public int i;
        }
        public int findDigitEnd(char[] arrChar, Int at) {
            int k = at.i;
            char c = arrChar[k];
            boolean bFirstZero = (c == '0');
            while (k < arrChar.length) {
                c = arrChar[k];
                //first non-digit which is a high chance.
                if (c > '9' || c < '0') {
                    break;
                }
                else if (bFirstZero && c == '0') {
                    at.i++;
                }
                k++;
            }
            return k;
        }

        @Override
        public int compare(char[] a, char[] b) {
            if(a != null || b != null){
                Int aNonzeroIndex = new Int();
                Int bNonzeroIndex = new Int();
                int aIndex = 0, bIndex = 0,
                        aComparedUnitTailIndex, bComparedUnitTailIndex;

//              Pattern pattern = Pattern.compile("D*(d+)D*");
//              Matcher matcher1 = pattern.matcher(a);
//              Matcher matcher2 = pattern.matcher(b);
//              if(matcher1.find() && matcher2.find()) {
//                  String s1 = matcher1.group(1);
//                  String s2 = matcher2.group(1);
//              }

                while(aIndex < a.length && bIndex < b.length){
                    //aIndex <
                    aNonzeroIndex.i = aIndex;
                    bNonzeroIndex.i = bIndex;
                    aComparedUnitTailIndex = findDigitEnd(a, aNonzeroIndex);
                    bComparedUnitTailIndex = findDigitEnd(b, bNonzeroIndex);
                    //System.err.println("Compared:"+aComparedUnitTailIndex+"--------"+bComparedUnitTailIndex);
                    //System.err.println("INDEX:"+aIndex+"--------"+bIndex);
                    //compare by number
                    if (aComparedUnitTailIndex > aIndex && bComparedUnitTailIndex > bIndex)
                    {
                        int aDigitIndex = aNonzeroIndex.i;
                        int bDigitIndex = bNonzeroIndex.i;
                        int aDigit = aComparedUnitTailIndex - aDigitIndex;
                        int bDigit = bComparedUnitTailIndex - bDigitIndex;
                        //System.err.println("DigitIndex:"+aDigitIndex+"--------"+bDigitIndex);
                        //System.err.println("Digit:"+aDigit+"--------"+bDigit);
                        //compare by digit
                        if(aDigit != bDigit)
                            return bDigit - aDigit;
                        //the number of their digit is same.
                        while (aDigitIndex < aComparedUnitTailIndex){
                            if (a[aDigitIndex] != b[bDigitIndex])
                                return  b[bDigitIndex] - a[aDigitIndex];
                            aDigitIndex++;
                            bDigitIndex++;
                        }
                        //if they are equal compared by number, compare the number of '0' when start with "0"
                        //ps note: paNonZero and pbNonZero can be added the above loop "while", but it is changed meanwhile.
                        //so, the following comparsion is ok.
                        aDigit = aNonzeroIndex.i - aIndex;
                        bDigit = bNonzeroIndex.i - bIndex;
                        if (aDigit != bDigit)
                            return bDigit - aDigit;
                        aIndex = aComparedUnitTailIndex;
                        bIndex = bComparedUnitTailIndex;
                    }else{
                        //System.err.println(a[aIndex]+"--------"+b[bIndex]);

                        if (a[aIndex] != b[bIndex])
                            return b[bIndex] - a[aIndex];
                        aIndex++;
                        bIndex++;
                    }

                }

            }
            return a.length - b.length;
        }

    };
    // "f01s2s22", "f1s02s2"
     static Comparator<char[]> ChsLogicCmpAsc = new Comparator<char[]>() {
        class Int{
            public int i;
        }
        public int findDigitEnd(char[] arrChar, Int at) {
            int k = at.i;
            char c = arrChar[k];
            boolean bFirstZero = (c == '0');
            while (k < arrChar.length) {
                c = arrChar[k];
                //first non-digit which is a high chance.
                if (c > '9' || c < '0') {
                    break;
                }
                else if (bFirstZero && c == '0') {
                    at.i++;
                }
                k++;
            }
            return k;
        }

        @Override
        public int compare(char[] a, char[] b) {
            if(a != null || b != null){
                Int aNonzeroIndex = new Int();
                Int bNonzeroIndex = new Int();
                int aIndex = 0, bIndex = 0,
                        aComparedUnitTailIndex, bComparedUnitTailIndex;

//              Pattern pattern = Pattern.compile("D*(d+)D*");
//              Matcher matcher1 = pattern.matcher(a);
//              Matcher matcher2 = pattern.matcher(b);
//              if(matcher1.find() && matcher2.find()) {
//                  String s1 = matcher1.group(1);
//                  String s2 = matcher2.group(1);
//              }

                while(aIndex < a.length && bIndex < b.length){
                    //aIndex <
                    aNonzeroIndex.i = aIndex;
                    bNonzeroIndex.i = bIndex;
                    aComparedUnitTailIndex = findDigitEnd(a, aNonzeroIndex);
                    bComparedUnitTailIndex = findDigitEnd(b, bNonzeroIndex);
                    //System.err.println("Compared:"+aComparedUnitTailIndex+"--------"+bComparedUnitTailIndex);
                    //System.err.println("INDEX:"+aIndex+"--------"+bIndex);
                    //compare by number
                    if (aComparedUnitTailIndex > aIndex && bComparedUnitTailIndex > bIndex)
                    {
                        int aDigitIndex = aNonzeroIndex.i;
                        int bDigitIndex = bNonzeroIndex.i;
                        int aDigit = aComparedUnitTailIndex - aDigitIndex;
                        int bDigit = bComparedUnitTailIndex - bDigitIndex;
                        //System.err.println("DigitIndex:"+aDigitIndex+"--------"+bDigitIndex);
                        //System.err.println("Digit:"+aDigit+"--------"+bDigit);
                        //compare by digit
                        if(aDigit != bDigit)
                            return aDigit - bDigit;
                        //the number of their digit is same.
                        while (aDigitIndex < aComparedUnitTailIndex){
                            if (a[aDigitIndex] != b[bDigitIndex])
                                return a[aDigitIndex] - b[bDigitIndex];
                            aDigitIndex++;
                            bDigitIndex++;
                        }
                        //if they are equal compared by number, compare the number of '0' when start with "0"
                        //ps note: paNonZero and pbNonZero can be added the above loop "while", but it is changed meanwhile.
                        //so, the following comparsion is ok.
                        aDigit = aNonzeroIndex.i - aIndex;
                        bDigit = bNonzeroIndex.i - bIndex;
                        if (aDigit != bDigit)
                            return aDigit - bDigit;
                        aIndex = aComparedUnitTailIndex;
                        bIndex = bComparedUnitTailIndex;
                    }else{
                        //System.err.println(a[aIndex]+"--------"+b[bIndex]);

                        if (a[aIndex] != b[bIndex])
                            return a[aIndex] - b[bIndex];
                        aIndex++;
                        bIndex++;
                    }

                }

            }
            return a.length - b.length;
        }

    };
    public static int printArray(char[] array,char value){
        for(int i = 0;i<array.length;i++){
            if(array[i]==value){
                return i;
            }
        }
        return -1;//当if条件不成立时，默认返回一个负数值-1
    }


}