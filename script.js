//soru oluşturma constructor
function Question (questionText,questionOpt,correctAnswer){
    this.questionText=questionText;
    this.questionOpt=questionOpt;
    this.correctAnswer=correctAnswer;
};
//prototype'ına function atıyoruz
Question.prototype.isQuestionCorrect=function(response){
    return response===this.correctAnswer;
}

let questions=[
    new Question("Osmanlı Devletinin Bizans ile yaptığı ilk savaş nedir?",{"a":"Sırpsındığı Savaşı","b":"Maltepe Savaşı","c":"Koyunhisar Savaşı"},"c"),
    new Question("TBMM'nin yabancı bir devletle imzaladığı ilk antlaşma nedir?",{"a":"Batum Antlaşması","b":"Gümrü Antlaşması","c":"Moskova Antlaşması"},"b"),
    new Question("Sevr Antlaşmasının geçersizliğini ilk kabul eden devlet hangisidir?",{"a":"Ermenistan","b":"Gürcistan","c":"Rusya"},"a"),
    new Question("Milli egemenlik ilkesinin güçlendirilmesi için yapılan ilk inkılap hangisidir?",{"a":"Cumhuriyetin ilanı","b":"Halifeliğin kaldırılması","c":"Saltanatın kaldırılması"},"c")
]
//Soruyu getir constructor
function Quiz(questionQ){
    this.questionQ=questionQ
    this.questionIndex=0;
}

Quiz.prototype.showQues=function(){
    return this.questionQ[this.questionIndex];
}

const quiz = new Quiz (questions);
console.log(quiz)

//________________________________________________________________________________________________________________________________________________________
//quizi başlatma click eventi
document.querySelector(".btn_start").addEventListener("click",function(){
    
    document.querySelector(".quiz_box").classList.add("active");
    bringQues(quiz.showQues())
  
})

//netx_btn ile sonraki soruya geçme
document.querySelector(".next_btn").addEventListener("click",function(){
    if(quiz.questionQ.length!=quiz.questionIndex+1){//quiz'deki soruların sayısı ile yukarıdaki değişken index eşit olmayana kadar çalıştırdık
        quiz.questionIndex+=1;  //questionIndex'i bir arttırdık ki sonraki soruya geçebilelim
        bringQues(quiz.showQues());//aşağıda tanımladığımız fonksiyonu burada çağırıyoruz soru ekrana geliyor
        document.querySelector(".next_btn").classList.remove("show");
        
    }else{
        document.querySelector(".card-body").innerHTML="Quiz Bitmiştir!"
        document.querySelector(".next_btn").classList.remove("show");
        // console.log("Quiz Bitmiştir!")//eğer eşit olursa bu yazıyı yazdırıyoruz
    }
    
})




//yukarıda tanımladığımız click eventinin işlenmesi
const bringQues=(que)=>{
    let questiontxt = `<span><b>${que.questionText} </b></span>`
    let answerBox="";

    for(let answer in que.questionOpt){ //for döngüsüyle dinamikleştiriyoruz
        answerBox+=`<div class="option">
                        <span> <b>${answer}</b>: ${que.questionOpt[answer]} </span>
                    </div>`;
                    
    }
    document.querySelector(".question_text").innerHTML=questiontxt; //sayfaya böyle ekliyoruz
    // document.querySelector(".option_list").insertAdjacentHTML("beforeend",answerBox) --> böyle de olur
    document.querySelector(".option_list").innerHTML=answerBox;

    //_______________________________________________________________________________________________________

    const option= document.querySelectorAll(".option")

        for(let opt of option){
            opt.setAttribute("onclick","optionsSelect(this)")//class'ı option olanlara onclick özelliği ekliyoreuz
        }
        
}

//class'ı option_list olan elemanların child'ına ulaşıyoruz
const opt_list=document.querySelector(".option_list").children;
//tik ve çarpı işaretlerini ekleme insertAdjacentHTML ile ekliyoruz
const fa_checkItem=`<div class="icon"><i class="fas fa-check"></i></div>`
const fa_timesItem=`<div class="icon"><i class="fas fa-times"></i></div>`


//yukarıda tanımladığımız onclick özelliğini burada kullanıyoruz
const optionsSelect=(opt)=>{
   
let choose= opt.querySelector("span b").textContent;
let correctA=quiz.showQues();
   
    if(correctA.isQuestionCorrect(choose)){ //yukarıdaki tanımladığımız değişkenleri burada kullandık
        opt.classList.add("correct");
        opt.insertAdjacentHTML("beforeend",fa_checkItem);

    }else{
        opt.classList.add("incorrect");
        opt.insertAdjacentHTML("beforeend",fa_timesItem);

    }
    //tıklandığı anda class'ına disable ekliyoruz ki bir seçim yapılabilsin
    for(let i=0;i<opt_list.length;i++){
        opt_list[i].classList.add("disabled");
    }
    document.querySelector(".next_btn").classList.add("show");//soruyu işaretledikten sonra görünsün diye

}