<template>
	<div class="ncu-loading-bounce-stick">
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
	$color1: #2F1E38;
	$color2: #FFCD57;
	.ncu-loading-bounce-stick {
	    border-radius: 50%;
	    position: relative;
	    width: 180px;
	    height: 180px;
		margin: auto;
	
	    &:after, &:before {
	        position: absolute;
	        content: "";
	    }
	    
	    &:after {
	        height: 10px;
	        width: 100px;
	        background-color: $color2;
	        border-radius: 5px;
	        top: 110px;
	        left: 40px;
	        animation: loader-swing 0.8s ease-in-out infinite;
	        animation-direction: alternate;
	    }
	    
	    &:before {
	        height: 20px;
	        width: 20px;
	        background-color: $color2;
	        border-radius: 50%;
	        top: 30px;
	        left: 78px;
	        animation: loader-bounce 0.4s ease-in-out infinite;
	        animation-direction: alternate;
	    }
	}
	
	@keyframes loader-bounce {
	    0% {
	        height: 24px;
	        transform: translateY(0px);
	    }
	    75%{
	        height: 20px;
	        width: 20px;
	    } 
	    100% {
	        height: 10px;
	        width: 24px;
	        transform: translateY(74px);
	    }
	}
	
	@keyframes loader-swing {
	    0% {
	        transform: rotate(-45deg);
	    }
	    
	    100% {
	        transform: rotate(45deg);
	    }
	}
</style>


