<script context="module" lang="ts">
	interface Window {
		OnActive(): void;
		chrome: Chrome;
	}
	interface Chrome {
		webview: WebView;
	}
	interface WebView {
		postMessage(message: string): void;
	}
	declare var window: Window;
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import { browser } from "$app/environment";

	let text: HTMLTextAreaElement | undefined;

	onMount(() => {
		document.addEventListener("keydown", async function (e) {
			if (e.code == "Enter" && e.ctrlKey) {
				e.preventDefault();
				if (text) {
					const v = text.value;
					text.value = "";

					await fetch(location.href, { method: "post", body: v });

					if (browser) {
						window?.chrome?.webview?.postMessage("close");
					}
				}
			}
		});
	});

	if (browser) {
		// WebView2 活性時
		if (window) {
			window.OnActive = () => {
				setTimeout(function () {
					text?.focus();
				}, 0);
			};
		}
	}
</script>

<textarea bind:this={text} contenteditable="true" />

<style lang="scss">
	textarea {
		width: 100%;
		height: auto;
		min-height: 75px;
		border: {
			style: solid;
			width: 1px;
		}
	}
</style>
