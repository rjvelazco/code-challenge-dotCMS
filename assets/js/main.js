(()=>{

    const img = document.querySelector('#img'),
    endPointUrl = document.querySelector('#url-endPoint'),
    baseUrl = document.querySelector('#img').getAttribute('src');

    const endPoints = ['', '/filter/Grayscale', '/crop_w/500/crop_h/500/fp/.65,.37', '/resize_w/800/resize_h/600', '/hsb_h/-1.0/hsb_s/0.0/hsb_b/1.0'];

    img.addEventListener( 'click', ()=>{
        img.setAttribute('src', 'https://demo.dotcms.com/contentAsset/image/229040b4-2f4f-436a-94aa-7d1f5c98ebdf/fileAsset/filter/Grayscale')
    });

    class TypeWriter{
        constructor(element, words, time=5000){

            // Set the properties 
            this.element = element;
            this.words = words;
            this.txt = '';

            // Inizialice the firs word
            this.wordsIndex = 0;
            
            // set time 
            this.time = parseInt(time, 10);

            this.isDeleting = false;
        }

        type(){

            // Current index of word
            const current = this.wordsIndex;

            // Get the word
            const fullTxt = this.words[current];

            if(this.isDeleting){
                // Remove one letter
                this.txt = fullTxt.substring(0,this.txt.length-1);
            } else{
                // Add one letter
                this.txt = fullTxt.substring(0,this.txt.length+1);
            }

            // Add the new element into the document
            this.element.innerHTML =  `<span class="txt">${this.txt}</pan>`;

            // Type Sepped by default
            let typeSpeed = 500;

            if(this.isDeleting){
                // We use half the time
                // remove is faster than add.
                typeSpeed /=2;
            }

            if(!this.isDeleting && this.txt === fullTxt){

                // Make pause at the end
                // Time between typing and erasing
                typeSpeed = this.time;

                // Set delete to true;
                this.isDeleting = true;

                // Change the src attribute
                img.setAttribute('src', `${baseUrl}${this.txt}`);

            } else if(this.isDeleting && this.txt === ''){
                // Set delete to false
                // The word is over
                this.isDeleting = false;

                // Conditional to reset the currentWordIndex
                (this.wordsIndex === this.words.length - 1)? this.wordsIndex = 0 : this.wordsIndex++;
                
                // Use the waiting time between each word
                typeSpeed = 1500;
            }

            // Recall tyoe funtion.
            setTimeout(()=>this.type(), 100);
        }
    }

    const typeWriter = new TypeWriter(endPointUrl, endPoints, 3000 );

    // Call function
    typeWriter.type();

})();