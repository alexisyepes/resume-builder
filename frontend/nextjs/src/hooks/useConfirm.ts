import { useConfirmWindowStore } from "@/store/useConfirmWindowStore"
import { ConfirmOptions } from "@/types/confirmWindow"

export function useConfirm() {
	const openConfirm = useConfirmWindowStore((state) => state.openConfirm)

	const confirm = async (options: ConfirmOptions): Promise<boolean> => {
		return await openConfirm(options)
	}

	return { confirm }
}

export const confirmWindow = async (
	options: ConfirmOptions
): Promise<boolean> => {
	const state = useConfirmWindowStore.getState()
	return await state.openConfirm(options)
}
