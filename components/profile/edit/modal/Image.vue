<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'onFile', key: 'image', file: File): void;
	}>();

	const currentUser = useCurrentUser();
	const image = ref(currentUser.value.profile!.imageUrl);
	const hiddenInput = ref();

	function onClick() {
		hiddenInput.value.click();
	}

	function onFileChange(event: Event) {
		return handleFileChange(event, (file, url) => {
			emit('onFile', 'image', file);

			image.value = url;
		});
	}
</script>

<template>
	<div class="relative w-full h-12">
		<div class="absolute flex items-center justify-center ml-6 bottom-4">
			<UserImage
				:src="image"
				:px="128"
				class="cursor-point border-bg-color border-[3px] bg-color"
			/>
			<ProfileEditModalFileButton @on-click="onClick" />
		</div>
	</div>
	<input
		ref="hiddenInput"
		accept="image/png, image/jpeg, image/webp"
		type="file"
		hidden
		@change="onFileChange"
	>
</template>
