class name1{
	constructor(obj){
		this.el=obj.el;
		this.imgUrl =obj.imgUrl;
		this.can = this.el.querySelector("#can");
		this.winResult = this.el.querySelector(".win-result");
		this.ctx=this.can.getContext("2d");
		this.img = new Image();
        this.offsetTopT = null;
        this.offsetLeftL = null ;
		this.offsetTopPar= null;
		this.offsetLeftPar= null;
		this.data =null;
		this.canW =this.can.width;
		this.canH =this.can.height;
		this.x =null;//计算清楚的坐标x轴；
		this.y = null;//计算清楚的坐标y轴；
		this.init();
	}
	init(){
		this.drawingCtx();
		this.clearCtx();
	}
	drawingCtx(){
		this.ctx.fillStyle="#999";
		this.ctx.fillRect(0,0,this.canW,this.canH);
		this.img.src =this.imgUrl;
		this.img.onload= ()=> {
            this.ctx.drawImage(this.img,0,0,this.canW,this.canH); //添加图片
        }
	}
	clearCtx(){
        this.can.ontouchstart = ()=>{
            this.ctx.globalCompositeOperation="destination-out";//做canvas清楚重叠部分
        }
		this.can.ontouchmove=(e)=>{
            // setTimeout(()=> {
            //     this.canData();
            // },0)

            this.x=e.changedTouches[0].clientX-this.offsetLeft(this.can);
            this.y=e.changedTouches[0].clientY-this.offsetTop(this.can);
			// ctx.fillRect(x-50,y-50,100,100);
			this.ctx.beginPath();
			this.ctx.moveTo(this.x,this.y);
			this.ctx.lineTo(this.x+50,this.y);
			this.ctx.lineTo(this.x,this.y+30);
			this.ctx.fill();//画线清楚画布
			console.log("x000");
		}
	}
    offsetTop(elem){
        this.offsetTopT =elem.offsetTop;
        this.offsetTopPar= elem.offsetParent;
        while (this.offsetTopPar){
            this.offsetTopT  +=this.offsetTopPar.offsetTop;
            this.offsetTopPar = this.offsetTopPar.offsetParent;
        }
        return this.offsetTopT;//offsetTop元素距离上边的距离
    }
    offsetLeft(elem){
        this.offsetLeftL = elem.offsetLeft;
        this.offsetLeftPar = elem.offsetParent;
        while (this.offsetLeftPar){
            this.offsetLeftL += this.offsetLeftPar.offsetLeft;
            this.offsetLeftPar = this.offsetLeftPar.offsetParent;
        }
        return this.offsetLeftL;//offsetTop元素距离左边的距离
    }
    canData(){//计算画布的像素信息
        this.data=this.ctx.getImageData(0,0,this.can.width,this.can.height).data;
        console.log(this.data);
        var j=0;
        for(var i=0 ;i<this.data.length;i+=4){
            console.log(i);
            if(this.data[i]==0){
                j++;
                if(j/(this.data.length/4>0.7)){
                    this.ctx.fillRect(0,0,360,360);
                }
            }
        }
    }

}
