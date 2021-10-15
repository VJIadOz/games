let k = 40
let N = 27644437
console.log(
    isPrime(N, k)?`Число ${N} простое`:`Число ${N} составное`
)


function power(a, t, n){
    let res = 1;
    a = a % n;
    while (t > 0){
        if (t & 1)
            res = (res*a) % n;
        t = t/2;
        a = (a*a) % n;
    }
    return res;
}

function isPrime(n, k){
    if (n == 2) return true
    if (n < 2 || n % 2 == 0) return false
    
    let t = n - 1
    let r =0
    while (t % 2 == 0){
        t /= 2
        r++
    }
    for (let i = 0; i < k; i++){
        let a = 2 + Math.floor(Math.random() * (n-4));
        
        let x = power(a, t, n);
        if (x == 1 || x == n-1)
            return true

        for (let j=0; j<r-1; j++){
            x = (x * x) % n;
            if (x == 1)    
                return false
            if (x == n-1)
                return true
        }
        return false
    }
    return true
}
