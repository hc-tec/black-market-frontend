<template>
	<div class='section'>
	    <div class='masthead-image master-container'>
	        <div class='content center'>
	            <h1 class='master'>
	              <div class='master-container-scroller'>
					  
	                <div 
						class='master-container-scroller_item'
						v-for="(item,index) in scrollItem"
						:key="item.text"
						@click="handleScrollItemClick(index)">
						<div class='cta-link'>
							{{ item.text }}
						</div>
	                </div>
					
	               <div 
					class='master-container-scroller_item'
					@click="handleScrollItemClick(0)">
						<div class='cta-link'>
							{{ scrollItem[0].text }}
						</div>
	                </div>
	              </div>
	            </h1>
	        </div>
	    </div>
	</div>
</template>

<script>
	/**
	 * @description 滚动条
	 * @property {Array} scrollItem 滚动条清单
	 * @event {Function} click 滚动条项目被点击
	 */
    export default {
		props: {
			scrollItem: {
				type: Array,
				default: () => [
					{
						text: 'Friend',
						link: '#',
					},
					{
						text: 'Enemy',
						link: '#',
					},
					{
						text: 'Mom',
						link: '#',
					},
					{
						text: 'Dad',
						link: '#',
					},
					{
						text: 'Brother',
						link: '#',
					},
					{
						text: 'Sister',
						link: '#',
					},
					{
						text: 'Son',
						link: '#',
					},
					{
						text: 'Daughter',
						link: '#',
					},
				]
			}
		},
        data() {
            return {

            }
        },
		methods: {
			handleScrollItemClick(index) {
				this.$emit('click', index)
			}
		}
    }
</script>

<style lang="scss" scoped>
		.cta-link {
			text-align: center;
		}
		.section {
		}
	   a {
	       margin: 0;
	       padding: 0;
	       border: 0;
	       font-size: 100%;
	       vertical-align: baseline;
	       background: transparent;
	       text-decoration: none;
	       color: #2c9ab7
	   }
	
	   a:hover {
	       text-decoration: underline
	   }
	
	   .master {
	      font-size: 60px;
	      line-height: 1;
	      font-weight: bold;
	      letter-spacing: 0;
	      -webkit-font-smoothing: inherit
	  }
	
	  .master {
	      text-rendering: optimizeLegibility
	  }
	
	  .master-container {
	      display: -webkit-flex;
	      display: -ms-flexbox;
	      display: flex;
	      -webkit-align-items: center;
	      -ms-flex-align: center;
	      align-items: center;
	      -webkit-justify-content: center;
	      -ms-flex-pack: center;
	      justify-content: center;
	      min-height: 0;
	      max-height: 100%;
	  }
	
	  .master-container .content {
	      height: auto;
	      margin-left: inherit;
	      margin-right: inherit
	  }
	
	  .master-container-scroller {
	      height: 66px;
	      margin-bottom: -6px;
	      overflow: hidden;
	      position: relative
	  }
	
	  .master-container-scroller .master-container-scroller_item {
	      display: block;
	      padding-bottom: 6px;
	      animation: scroll 15s 2s cubic-bezier(0.645, 0.045, 0.355, 1) infinite
	  }
	
	  .master-container-scroller .master-container-scroller_item[href]:hover {
	      text-decoration: underline
	  }
	
	  .master-container-scroller .master-container-scroller_item:nth-child(1),
	  .master-container-scroller .master-container-scroller_item:nth-child(1) a {
	      color: #E65F48
	  }
	
	  .master-container-scroller .master-container-scroller_item:nth-child(2),
	  .master-container-scroller .master-container-scroller_item:nth-child(2) a {
	      color: #E65F48
	  }
	
	  .master-container-scroller .master-container-scroller_item:nth-child(3),
	  .master-container-scroller .master-container-scroller_item:nth-child(3) a {
	      color: #76BCAD
	  }
	
	  .master-container-scroller .master-container-scroller_item:nth-child(4),
	  .master-container-scroller .master-container-scroller_item:nth-child(4) a {
	      color: #84719f
	  }
	
	  .master-container-scroller .master-container-scroller_item:nth-child(5),
	  .master-container-scroller .master-container-scroller_item:nth-child(5) a {
	      color: #d47787
	  }
	
	  .master-container-scroller .master-container-scroller_item:nth-child(6),
	  .master-container-scroller .master-container-scroller_item:nth-child(6) a {
	      color: #F09551
	  }
	
	  .master-container-scroller .master-container-scroller_item:nth-child(7),
	  .master-container-scroller .master-container-scroller_item:nth-child(7) a {
	      color: #349AB5
	  }
	
	  .master-container-scroller .master-container-scroller_item:nth-child(8),
	  .master-container-scroller .master-container-scroller_item:nth-child(8) a {
	      color: #e86042
	  }
	
	  .master-container-scroller .master-container-scroller_item:nth-child(9),
	  .master-container-scroller .master-container-scroller_item:nth-child(9) a {
	      color: #74bcae
	  }
	
	  .master-container-scroller .master-container-scroller_item:nth-child(10),
	  .master-container-scroller .master-container-scroller_item:nth-child(10) a {
	      color: #E65F48
	  }
	
	
	  .master-container-grid .master-container-grid_item:nth-child(1) .grid_item-overlay {
	      background-color: rgba(230, 95, 72, 0.9)
	  }
	
	  .master-container-grid .master-container-grid_item:nth-child(2) .grid_item-overlay {
	      background-color: rgba(230, 95, 72, 0.9)
	  }
	
	  .master-container-grid .master-container-grid_item:nth-child(3) .grid_item-overlay {
	      background-color: rgba(118, 188, 173, 0.9)
	  }
	
	  .master-container-grid .master-container-grid_item:nth-child(4) .grid_item-overlay {
	      background-color: rgba(132, 113, 159, 0.9)
	  }
	
	  .master-container-grid .master-container-grid_item:nth-child(5) .grid_item-overlay {
	      background-color: rgba(212, 119, 135, 0.9)
	  }
	
	  .master-container-grid .master-container-grid_item:nth-child(6) .grid_item-overlay {
	      background-color: rgba(240, 149, 81, 0.9)
	  }
	
	  .master-container-grid .master-container-grid_item:nth-child(7) .grid_item-overlay {
	      background-color: rgba(52, 154, 181, 0.9)
	  }
	
	  .master-container-grid .master-container-grid_item:nth-child(8) .grid_item-overlay {
	      background-color: rgba(232, 96, 66, 0.9)
	  }
	
	  .master-container-grid .master-container-grid_item:nth-child(9) .grid_item-overlay {
	      background-color: rgba(116, 188, 174, 0.9)
	  }
	
	  .master-container-grid .master-container-grid_item:nth-child(10) .grid_item-overlay {
	      background-color: rgba(230, 95, 72, 0.9)
	  }
	
	  .master-container-grid .master-container-grid_item .img {
	      position: relative
	  }
	
	  .master-container-grid .master-container-grid_item .grid_item-overlay {
	      position: absolute;
	      top: 0;
	      right: 0;
	      bottom: 0;
	      left: 0;
	      display: -webkit-flex;
	      display: -ms-flexbox;
	      display: flex;
	      -webkit-align-items: center;
	      -ms-flex-align: center;
	      align-items: center;
	      -webkit-justify-content: center;
	      -ms-flex-pack: center;
	      justify-content: center;
	      font-size: 26px;
	      font-weight: bold;
	      color: #fff;
	      opacity: 0;
	      transition: opacity .3s ease-in-out;
	      text-decoration: none
	  }
	
	  .master-container-grid .master-container-grid_item .grid_item-overlay:hover {
	      opacity: 1
	  }
	
	  .master-container-grid .master-container-grid_item .grid_item-overlay .link {
	      display: inline-block;
	      box-shadow: 0 1px 0 0 #fff, inset 0 0 0 #fff;
	      transition: box-shadow .2s ease
	  }
	
	  .master-container-grid .master-container-grid_item .grid_item-overlay .link:hover {
	      box-shadow: 0 2px 0 0 #fff, inset 0 -1px 0 0 #fff
	  }
	  @keyframes master-container-bg {
	      0.0% {
	          background-color: #F5C59C
	      }
	      3.7037037037037037% {
	          background-color: #F5C59C
	      }
	      11.11111111111111% {
	          background-color: #ECC9CB
	      }
	      14.814814814814815% {
	          background-color: #ECC9CB
	      }
	      22.22222222222222% {
	          background-color: #D9E2CB
	      }
	      25.925925925925927% {
	          background-color: #D9E2CB
	      }
	      33.333333333333336% {
	          background-color: #f6c599
	      }
	      37.03703703703704% {
	          background-color: #f6c599
	      }
	      44.44444444444444% {
	          background-color: #c4bbd3
	      }
	      48.148148148148145% {
	          background-color: #c4bbd3
	      }
	      55.55555555555556% {
	          background-color: #F9E7AF
	      }
	      59.25925925925926% {
	          background-color: #F9E7AF
	      }
	      66.66666666666667% {
	          background-color: #B4E2EE
	      }
	      70.37037037037037% {
	          background-color: #B4E2EE
	      }
	      77.77777777777777% {
	          background-color: #cbe5f4
	      }
	      81.48148148148148% {
	          background-color: #cbe5f4
	      }
	      88.88888888888889% {
	          background-color: #d2e7e2
	      }
	      92.5925925925926% {
	          background-color: #d2e7e2
	      }
	      100.0% {
	          background-color: #F5C59C
	      }
	  }
	  @keyframes scroll {
	      0.0% {
	          -webkit-transform: translateY(0px);
	          transform: translateY(0px)
	      }
	      3.7037037037037037% {
	          -webkit-transform: translateY(0px);
	          transform: translateY(0px)
	      }
	      11.11111111111111% {
	          -webkit-transform: translateY(-66px);
	          transform: translateY(-66px)
	      }
	      14.814814814814815% {
	          -webkit-transform: translateY(-66px);
	          transform: translateY(-66px)
	      }
	      22.22222222222222% {
	          -webkit-transform: translateY(-132px);
	          transform: translateY(-132px)
	      }
	      25.925925925925927% {
	          -webkit-transform: translateY(-132px);
	          transform: translateY(-132px)
	      }
	      33.333333333333336% {
	          -webkit-transform: translateY(-198px);
	          transform: translateY(-198px)
	      }
	      37.03703703703704% {
	          -webkit-transform: translateY(-198px);
	          transform: translateY(-198px)
	      }
	      44.44444444444444% {
	          -webkit-transform: translateY(-264px);
	          transform: translateY(-264px)
	      }
	      48.148148148148145% {
	          -webkit-transform: translateY(-264px);
	          transform: translateY(-264px)
	      }
	      55.55555555555556% {
	          -webkit-transform: translateY(-330px);
	          transform: translateY(-330px)
	      }
	      59.25925925925926% {
	          -webkit-transform: translateY(-330px);
	          transform: translateY(-330px)
	      }
	      66.66666666666667% {
	          -webkit-transform: translateY(-396px);
	          transform: translateY(-396px)
	      }
	      70.37037037037037% {
	          -webkit-transform: translateY(-396px);
	          transform: translateY(-396px)
	      }
	      77.77777777777777% {
	          -webkit-transform: translateY(-462px);
	          transform: translateY(-462px)
	      }
	      81.48148148148148% {
	          -webkit-transform: translateY(-462px);
	          transform: translateY(-462px)
	      }
	      88.88888888888889% {
	          -webkit-transform: translateY(-528px);
	          transform: translateY(-528px)
	      }
	      92.5925925925926% {
	          -webkit-transform: translateY(-528px);
	          transform: translateY(-528px)
	      }
	      100.0% {
	          -webkit-transform: translateY(-594px);
	          transform: translateY(-594px)
	      }
	  }
	  
	  @keyframes scroll-mobile {
	      0.0% {
	          -webkit-transform: translateY(0px);
	          transform: translateY(0px)
	      }
	      3.7037037037037037% {
	          -webkit-transform: translateY(0px);
	          transform: translateY(0px)
	      }
	      11.11111111111111% {
	          -webkit-transform: translateY(-48px);
	          transform: translateY(-48px)
	      }
	      14.814814814814815% {
	          -webkit-transform: translateY(-48px);
	          transform: translateY(-48px)
	      }
	      22.22222222222222% {
	          -webkit-transform: translateY(-96px);
	          transform: translateY(-96px)
	      }
	      25.925925925925927% {
	          -webkit-transform: translateY(-96px);
	          transform: translateY(-96px)
	      }
	      33.333333333333336% {
	          -webkit-transform: translateY(-144px);
	          transform: translateY(-144px)
	      }
	      37.03703703703704% {
	          -webkit-transform: translateY(-144px);
	          transform: translateY(-144px)
	      }
	      44.44444444444444% {
	          -webkit-transform: translateY(-192px);
	          transform: translateY(-192px)
	      }
	      48.148148148148145% {
	          -webkit-transform: translateY(-192px);
	          transform: translateY(-192px)
	      }
	      55.55555555555556% {
	          -webkit-transform: translateY(-240px);
	          transform: translateY(-240px)
	      }
	      59.25925925925926% {
	          -webkit-transform: translateY(-240px);
	          transform: translateY(-240px)
	      }
	      66.66666666666667% {
	          -webkit-transform: translateY(-288px);
	          transform: translateY(-288px)
	      }
	      70.37037037037037% {
	          -webkit-transform: translateY(-288px);
	          transform: translateY(-288px)
	      }
	      77.77777777777777% {
	          -webkit-transform: translateY(-336px);
	          transform: translateY(-336px)
	      }
	      81.48148148148148% {
	          -webkit-transform: translateY(-336px);
	          transform: translateY(-336px)
	      }
	      88.88888888888889% {
	          -webkit-transform: translateY(-384px);
	          transform: translateY(-384px)
	      }
	      92.5925925925926% {
	          -webkit-transform: translateY(-384px);
	          transform: translateY(-384px)
	      }
	      100.0% {
	          -webkit-transform: translateY(-432px);
	          transform: translateY(-432px)
	      }
	  }
</style>


