(()=>{

    const img = document.querySelector('.img'),
    endPoint = document.querySelector('#endPoint'),
    contentText = document.querySelector('.card-body');
    // baseUrl = document.querySelector('#img').getAttribute('src');

    const endPoints = ['/filter/Grayscale', '/crop_w/500/crop_h/500/fp/.65,.37', '/resize_w/800/resize_h/600', '/hsb_h/-1.0/hsb_s/0.0/hsb_b/1.0',''];
    
    const flashAnimated = document.querySelector('.cursor-effect');
    
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
            this.element.innerHTML =  `${this.txt}`;

            // Type Sepped by default
            let typeSpeed = 200;

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


                // Add flash class
                flashAnimated.classList.add('flash');

                toggleTransition(current);
                // Remove flash class after 2s
                setTimeout(()=>flashAnimated.classList.remove('flash'), typeSpeed);
                // Change the src attribute

            } else if(this.isDeleting && this.txt === ''){
                // Set delete to false
                // The word is over
                this.isDeleting = false;

                toggleTransition(current);

                // Conditional to reset the currentWordIndex
                (this.wordsIndex === this.words.length - 1)? this.wordsIndex = 0 : this.wordsIndex++;
                
                // Use the waiting time between each word
                typeSpeed = 1000;

                // Add flash class
                flashAnimated.classList.add('flash');

                // Remove flash class after 1s
                setTimeout(()=>flashAnimated.classList.remove('flash'), typeSpeed);
            }

            // Recall tyoe funtion.
            setTimeout(()=>this.type(), typeSpeed);
        }
    }

    const toggleTransition = (wordIndex)=>{
        switch (wordIndex) {
            case 0:
                img.classList.toggle('grey-scale');
            break;

            case 1:
                img.classList.toggle('cropped');
            break;

            case 2:
                img.classList.toggle('resized');
            break;

            case 3:
                if(img.classList.contains('hsb')){
                    toggleShowClass();
                    setTimeout(()=>{
                        toggleShowClass();
                    }, 1000);
                }
                img.classList.toggle('hsb');
            break;
        }
    }
    const toggleShowClass = ()=>{
        contentText.classList.toggle('show');
    }

    const typeWriter = new TypeWriter(endPoint, endPoints, 2000 );
    toggleShowClass();

    // Call function
    typeWriter.type();
})();