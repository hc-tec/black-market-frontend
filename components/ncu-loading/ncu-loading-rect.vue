<template>
	<div class="ncu-loading-rect">
	</div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	$color1: white;
	$color2: #FFCD57;
	.ncu-loading-rect {
	    position: relative;
	    width: 180px;
	    height: 140px;
	    margin: auto;
		
	    &:after, &:before {
	        position: absolute;
	        content: "";
	        background-color: $color2;
	    }
	    
	    &:after {
	        height: 40px;
	        width: 40px;
	        left: 70px;
	        top: 50px;
	        border-radius: 3px;
	        background-color: $color1;
	        animation: loader-rotate1 1.8s ease-in-out infinite;
	        animation-direction: alternate;
	        transform-origin: center center;
	    }
	    
	    &:before {
	        height: 80px;
	        width: 80px;
	        top: 30px;
	        left: 50px;
	        border-radius: 7px;
	        background-color: $color2;
	        animation: loader-rotate2 1.8s ease-in-out infinite;
	        animation-direction: alternate;
	        transform-origin: center center;
	    }
	}
	
	@keyframes loader-rotate1 {
	    0% {
	        transform: rotate(0deg) scale(1);
	    } 
	    65% {
	        transform: rotate(-90deg) scale(0.3);
	    }
	    100% {
	        transform: rotate(270deg) scale(1.2);
	    }
	}
	@keyframes loader-rotate2 {
	    0% {
	        transform: rotate(0deg) scale(1);
	    } 
	    45% {
	        transform: rotate(90deg) scale(0.8);
	    }
	    100% {
	        transform: rotate(-270deg) scale(1.1);
	    }
	}
</style>


