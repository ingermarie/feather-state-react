import { useSyncExternalStore, useEffect } from 'react';
import { Store } from 'feather-state';

export const useStore = <S>(store: Store<S>) => {
	const sync = <O extends object, K extends keyof Omit<O, 'watch'>>(value: O, key: K) => {
		let snapshot = value[key];
		return useSyncExternalStore(
			(notify) => {
				const unwatch = store.watch(value, key, (next) => {
					snapshot = next;
					notify();
				});
				return unwatch;
			},
			() => snapshot,
			() => snapshot,
		);
	};

	const watch: Store['watch'] = (ref, key, notify) => {
		const unwatch = store.watch(ref, key, notify);
		useEffect(() => unwatch, [unwatch]);
		return unwatch;
	};

	return { sync, watch };
};
