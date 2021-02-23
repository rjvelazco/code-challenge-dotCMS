(()=>{

    const img = document.querySelector('.img'),
    imgContainer = document.querySelector('.imgContainer'),
    contentText = document.querySelector('.card-body'),
    endPointContainer = document.querySelector('#endPoint'),
    blinkingCursor = document.querySelector('.cursor-effect');

    
    // ENDPOINTS    
    const endPoints = ['/resize_w/800/resize_h/600', '/crop_w/500/crop_h/500/fp/.65,.37', '/focalpoints/fp-x=45%/f-py=45%/scale(1.2)', '/filter/Grayscale', '/hsb_h/-1.0/hsb_s/0.0/hsb_b/1.0',''];
 
    class TypeWriter{

        constructor(element, words, time = 5000){

            // Set properties
            this.element = element;
            this.words = words;
            this.time = parseInt(time, 10);

            // New properties
            this.txt = '';
            this.wordsIndex = 0;
            this.isDeleting = false;
        }


        type(){
            const currentIndex = this.wordsIndex;
            const fullTxt = this.words[currentIndex];
            let typeSpeed = (this.isDeleting)? 200: 100;
            
            (this.isDeleting)
                    ? this.txt = fullTxt.substring(0, this.txt.length - 1)
                    : this.txt = fullTxt.substring(0, this.txt.length + 1);

            this.element.innerHTML = `${this.txt}`;


            if(!this.isDeleting && this.txt === fullTxt){

                this.isDeleting = true;
                typeSpeed = this.time;

                toggleBlinkingEffect(typeSpeed);
                toggleTransition(currentIndex, true);
                deleteWord();

            } else if(this.isDeleting && this.txt === '') {
                this.isDeleting = false;

                (this.wordsIndex === (this.words.length -1))
                ? this.wordsIndex = 0
                : this.wordsIndex++;

                typeSpeed = 1000;
                toggleTransition(currentIndex);
                toggleBlinkingEffect(typeSpeed);
            }

            setTimeout(()=>this.type(), typeSpeed);
        }
    }

    const toggleTransition = (wordIndex, reset = false) =>{
        switch (wordIndex){
            case 0:
                img.classList.add('resized');
            break;
            case 1:
                if(img.classList.contains('cropped')){
                    setTimeout(img.classList.remove('resized'), 1000);
                }
                img.classList.toggle('cropped');
            break;
            case 2:
                showFocalPoints();
            break;
            case 3:
                img.classList.add('grey-scale');
            break;
            case 4:
                img.classList.toggle('hsb');
                if(img.classList.contains('grey-scale')){
                    img.classList.remove('grey-scale');
                }
            break;
            case 5:
               if(reset){
                   resetAnimations();
               }
            break;
        }
    }

    const toggleShowClass = () => contentText.classList.toggle('show');

    
    const resetAnimations = ()=>{
        toggleShowClass();
        img.classList.remove('zoomScale');
        setTimeout(()=>toggleShowClass(), 1200);
    }
    
    const showFocalPoints = ()=>{
        imgContainer.classList.toggle('show');
        setTimeout(()=>imgContainer.classList.add('move'), 1000);
        setTimeout(()=>{
            imgContainer.classList.remove('move');
            img.classList.add('zoomScale');
        }, 1500);
    }
    
    const toggleBlinkingEffect = (Speed)=>{
        blinkingCursor.classList.add('blinking');
        setTimeout(()=>blinkingCursor.classList.remove('blinking'), Speed);
    }

    const deleteWord = ()=>{
        setTimeout(()=>endPointContainer.classList.add('highlight'), 1500);
        setTimeout(()=>{;
            typeWriter.txt = '';
            typeWriter.element.innerHTML = '';
            endPointContainer.classList.remove('highlight');
        }, 2500);
    }

    const typeWriter = new TypeWriter(endPointContainer, endPoints, 2500);
    toggleShowClass();

    typeWriter.type();
})();