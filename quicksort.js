
Array.prototype.swap = function(i,j){
   /*
    Swap element at index i with j
   */
   var temp = this[i];
   this[i] = this[j];
   this[j] = temp;

};

Array.prototype.partition = function partition(p,r,comparator){
    /*
    Uses a randomized partitioninig approach
    */
         var comparator = (typeof comparator !== 'undefined')?comparator:function(a,b){
                                                                          if(a<=b){
                                                                                return 1;
                                                                            }
                                                                            else return 0;
                                                                        };
                                                                        
         var i = p-1;
         var k = p + Math.floor(Math.random() * (r-p));
         this.swap(k,r);
         var x = this[r];
         for(var j=p;j<=r-1;j++){
             if(comparator(this[j],x) === 1){
             	i = i+1;
                this.swap(i,j);
             }

         }
        this.swap(i+1,r);
        return i+1;
    };

Array.prototype.select = function(p,r,i,comparator){
    /*
    Select the ith order statistic
    */
    if(p === r){
        return this[p];
    }
    var q = this.partition(p,r,comparator);
    console.log(q,this);
    var k = q-p+1;
    if(i === k){
        return this[q];
    }
    // else recursively traverse the array
    if(i<k){
        return this.select(p,q-1,i);
    }
    else{
        return this.select(q+1,r,i-k);

    }




};

Array.prototype.quicksort = function (p,r){


	partition = function (p,r){
         var x = this[r];
         var i = p-1;
         for(var j=p;j<=r-1;j++){
             if(this[j] <= x){

             	i = i+1;
                this.swap(i,j);
             }
        

         }
        this.swap(i+1,r);
        return i+1;
    }.bind(this);


    if(p<r){
    var q = partition(p,r);
    this.quicksort(p,q-1);
    this.quicksort(q+1,r);
    }

};

!function(){
    var arr = [96,24,12,86,2,176,3];
   console.log(arr.select(0,arr.length-1,4));
   //console.log(arr.partition(0,arr.length-4));
   console.log(arr);

}();