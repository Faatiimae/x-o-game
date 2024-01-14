window.addEventListener('load', function(){


    var POINTER= 'x'
    var GAMESTATUS = true 
    var interval;
    const _timer_ = 5
    var timer = _timer_;
    const SCHEMA =[
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    
    const _x =document.getElementById('x')
    const _o =document.getElementById('o')
    const _timer =document.getElementById('timer')
    const _x_name =document.getElementById('x_name')
    const _o_name =document.getElementById('o_name')
    const _x_score =document.getElementById('x_score')
    const _o_score =document.getElementById('o_score')
    const _game_board=document.querySelectorAll('#game_board div')


    const xName =this.localStorage.getItem('xName')|| prompt('X adini daxil edin')
    const oName =this.localStorage.getItem('oName') || prompt('O adini daxil edin')

    var xScore = Number(this.localStorage?. xScore) || 0;
    var oScore = Number(this.localStorage?. oScore) || 0;

     this.localStorage.setItem('xName',xName)
     this.localStorage.setItem('oName',oName)
     this.localStorage.setItem('xScore',xScore)
     this.localStorage.setItem('oScore',oScore)
    
    _x_name.innerText=xName
    _o_name.innerText=oName

    _x_score.innerText=xScore
    _o_score.innerText=oScore

    Timer()
    _game_board.forEach(function(value,index){
        
        value.addEventListener("click",function(){ 
            if(GAMESTATUS){
                if(isEmpty(value)){
                    ClickBox(value)
                    isGameOver()
                }else{
                    alert('Doludur')
                }
            }else{  
                if(window.confirm('yeniden oyna'));
                window.open('index.html','index.html')  
            }
        })
    })

    function ClickBox(box){
        if (box) box.innerText=POINTER
        POINTER=POINTER  ==='x' ? 'o' : 'x'
        _x.classList.remove('select')
        _o.classList.remove('select')
        if(POINTER === 'x') _x.classList.add('select')
        else _o.classList.add('select')
        window.clearInterval(interval)
        timer= _timer_
        Timer()
    }

    function isEmpty(box){
        return box.innerText == '' ? true : false
    }
   function isGameOver(){
    let empty = 0;
     for(let value of SCHEMA){
        const box_1=_game_board[value[0]]
        const box_2=_game_board[value[1]]
        const box_3=_game_board[value[2]]
        if(!(isEmpty(box_1) || isEmpty(box_2) || isEmpty(box_3))){
         if(box_1.innerText === box_2.innerText && box_2.innerText === box_3.innerText){
         GameOver()
        break
        }
        }
     }

     for (let box of _game_board){
            if(isEmpty(box)) empty++
     }  if(empty===0 && GAMESTATUS) alert('Oyun hec-hece bitdi')
   }

   function GameOver(){
    GAMESTATUS = false;
    if(POINTER === 'x'){
         oScore++;
         _o_score.innerText=oScore
         localStorage.setItem('oScore',oScore)
    }else{
       xScore++;
       _x_score.innerText=xScore
       localStorage.setItem('xScore',xScore)
    }
   }
    function Timer(){
        interval = window.setInterval(function(){
        if(GAMESTATUS){ 
                if (timer-- > 0) _timer.innerText=timer
                else ClickBox()      
            }else {
                window.clearInterval(interval)
            }
         },1000)
    }
});