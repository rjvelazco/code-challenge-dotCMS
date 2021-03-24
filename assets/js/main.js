(()=>{
    const img = document.querySelector('.img'),
    imgContainer = document.querySelector('.imgContainer'),
    contentText = document.querySelector('.card-body-img-api'),
    endPointContainer = document.querySelector('#endPoint'),
    blinkingCursor = document.querySelector('.cursor-effect');


    

    // ENDPOINTS    
    const endPoints = ['/resize_w/800/resize_h/600', '/crop_w/500/crop_h/500', true, '/fp', '/.69,.67', '/crop_w/500/crop_h/500/', true, '/filter/Grayscale', '/hsb_h/-1.0/hsb_s/0.0/hsb_b/1.0', ''];
 

    // Times
    const time500s = 500,
    time1000s = 1000,
    time1500s = 1500,
    time2000s = 2000;
    time2500s = 2500;
    time3000s = 3000;

    class TypeWriter{

        constructor(element, words, time){

            // Set properties
            this.element = element;
            this.words = words;
            this.time = parseInt(time, 10);

            // New properties
            this.txt = '';
            this.wordsIndex = 0;
            this.isDeleting = false;

            this.allTxt = '';
        }


        type(){
            const currentIndex = this.wordsIndex;
            let fullTxt = this.words[currentIndex];
            let typeSpeed = (this.isDeleting)? 150: 100;
            
            if(currentIndex === this.words.length - 1){

                this.allTxt = '';
                this.wordsIndex = 0;
                resetLoop();
                setTimeout(()=>this.type(), time3000s);
                return;

            }

            if(this.nextWord && this.allTxt.length > 0){
                this.txt = this.allTxt;
                this.nextWord = false;
            }

            if(typeof fullTxt === 'boolean'){
                this.allTxt = '';
                this.wordsIndex++;
                deleteWord();
                setTimeout(()=>toggleTransition(currentIndex-1), time1000s);
                setTimeout(()=>this.type(), time2500s);
                return;
            }

            fullTxt = this.allTxt + this.words[currentIndex];

            
            if(this.allTxt.length > 0){
                // add the word before to the new word
                this.txt = this.allTxt + fullTxt.substring(this.allTxt.length, this.txt.length + 1);
            } else{
                // set a new word
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.element.innerHTML = `${this.txt}`;

            if(this.txt === fullTxt){
                this.allTxt = this.txt;
                this.txt = '';
                typeSpeed = this.time;

        
                this.wordsIndex++;
                this.nextWord = true;

                toggleBlinkingEffect(time1000s);
                toggleTransition(currentIndex, true);
            } 

            setTimeout(()=>this.type(), typeSpeed);
        }
    }
    
    
    const toggleTransition = (wordIndex) =>{
        switch (wordIndex){
            case 0:
                img.classList.add('resized');
            break;
            case 1:
                if(img.classList.contains('cropped')){
                    setTimeout(img.classList.remove('resized'), time1000s);
                }
                img.classList.toggle('cropped');
            break;
            case 3:
                showFocalPoints();
            break;
            case 4:
                moveFocalPoints()
            break;
            case 5:
                imgContainer.classList.add('minimun');
                setTimeout(()=>{
                    hideFocalPoints();
                }, 600);
            break;
            case 7:
                img.classList.add('grey-scale');
            break;
            case 8:
                img.classList.add('hsb');
            break;
        }
    }

    const toggleShowClass = () => contentText.classList.toggle('show');

    
    const resetAnimations = ()=>{
        imgContainer.classList.remove('zoomScale');
    }
    
    const showFocalPoints = ()=>{
        imgContainer.classList.add('showLeft');
        imgContainer.classList.add('showBottom');
    }

    const moveFocalPoints = ()=>{
        imgContainer.classList.add('moveLeft');
        imgContainer.classList.add('moveBottom');
    }
    
    const hideFocalPoints = () =>{
        imgContainer.classList.add('zoomScale');
        setTimeout(()=>{
            imgContainer.classList.remove('showLeft');
            imgContainer.classList.remove('showBottom');
        },1400);
    }
    
    const toggleBlinkingEffect = (Speed)=>{
        blinkingCursor.classList.add('blinking');
        setTimeout(()=>blinkingCursor.classList.remove('blinking'), Speed);
    }

    const deleteWord = ()=>{
        setTimeout(()=>endPointContainer.classList.add('highlight'), time500s);
        setTimeout(()=>{;
            // typeWriter.isDeleting = true;
            typeWriter.txt = '';
            typeWriter.element.innerHTML = '';
            endPointContainer.classList.remove('highlight');
        }, 1000);
    }

    const resetLoop = () =>{
        deleteWord();

        setTimeout(()=>{
            imgContainer.classList.remove('moveBottom');
            imgContainer.classList.remove('moveLeft');
            imgContainer.classList.remove('minimun');
            img.classList.remove('grey-scale');
            img.classList.remove('hsb');
            resetAnimations();  
        }, 1000)
    }

    const typeWriter = new TypeWriter(endPointContainer, endPoints, time1000s);

    setTimeout(()=>{
        typeWriter.type();
    }, time1500s);

})();