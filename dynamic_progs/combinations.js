/*
Count the number of combinations for an aggregate score s and given a list of possible scores W
problem: given s and W=[w0,w1,w2...,wn-1]
calculte the set X = [<x0,x1,...xn-1>] such that s = sum i=0 ->n-1 (xiwi)
*/


function seq_vector_add(A,BB){
    /*
    Add a vector to a sequence of vectors
    Args:
    A(Array) - an array of numbers
	BB(Array:Array) is an array of array of numbers
	output:
	CC(Array:Array) returns an array of array of numbers
	*/
	var CC = [];
	var i;
	for(i=0;i<BB.length;i++){

		var cc = vector_add(A,BB[i]);
		if(cc.length !== 0){
			CC.push(cc);
		}
	}
	return CC;
}

function vector_add(A,B){
    /*
    Adds two vectors.
    Args:
    A(array:number)
    B(array:number)
    output:
    Array C where C[i]=A[i]+B[i]
    */
    if(A.length === B.length){
    	return A.map(function(val,i){return Number(val)+Number(B[i]);});
	}
	return [];

}

function get_sequence(W,i){
	/*
    Creates a sequence vector given an array W
    Args:
    W(Array:number): An array of numbers
    i(number): The index to mark wi
    output:
    seq(Array:number)
    returns a vector array, with all zeroes except for
    position i which is marked as 1.
	*/
	var j;
	var seq = [];
	for(j=0;j<W.length;j++){
        seq[j] = 0;
	}
    if(i<W.length){
    	seq[i] = 1;
    }
    return seq;

}

function permute(s,W){
    /*
    Args:
    s(number): score, integer
    W(array): Array of integer scores
    output:
    obj{
    number(number): total number of sequences of W that sum to s
    permuations(Array:Array): the actual permutations.
    }
    */
    var j;
    var i;
    var combiArray = [];
    var permutations = []; // permutation of sequences
    for(i=0;i<=s;i++){
    	combiArray[i] = 0;    // initialize values.
    	permutations[i]= [];  // contains no permutations
    }
    combiArray[0] = 1;
    var sequence = [];
    permutations[0].push(get_sequence(W,W.length));
    // permutations[j] stores all the seen sequences that sum to j
    
    for(i=0;i<W.length;i++){
    	sequence = get_sequence(W,i);
        for(j=W[i];j<=s;j++){
            
        	combiArray[j] += combiArray[j-W[i]];
        	var addedSeq = seq_vector_add(sequence,permutations[j-W[i]]);
        	if(addedSeq.length !== 0){
        	    permutations[j] = permutations[j].concat(addedSeq);
        	}

        }

    }
    return {"number":combiArray[s],
            "permutations":permutations[s]};

}