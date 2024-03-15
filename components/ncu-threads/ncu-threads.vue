<template>
	<div 
		class="ncu-threads"
		:style="_style">
		<slot></slot>
	</div>
</template>

<script>
    export default {
		name: 'ncu-threads',
		props: {
			_style: {
				type: String,
			}
		},
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
	.ncu-threads {
		margin-top: 10px;
	}
</style>


