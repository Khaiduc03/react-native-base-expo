/* eslint-disable @typescript-eslint/no-unused-vars */
import { applySnapshot, getSnapshot, IDisposer, onSnapshot, SnapshotOut } from "mobx-state-tree"

import * as storage from "@/utils/storage"

import type { RootStore, RootStoreSnapshot } from "../RootStore"

interface IPersistor<Store extends InstanceType<any>> {
  version: number
  whitelist?: Array<keyof SnapshotOut<Store> & string>
  blacklist?: Array<keyof SnapshotOut<Store> & string>
}

type RootStorePersistor = {
  [Key in keyof Omit<RootStore, "__MstQueryAction" | "__getModelStores" | "getQueries" | "runGc"> &
    string]?: IPersistor<RootStore[Key]>
}

const persistorConfig: RootStorePersistor | undefined = {
  //whitelist là những key sẽ được lưu trữ, nếu không có thì sẽ lưu toàn bộ
  //blacklist là những key sẽ không được lưu trữ, nếu không có thì sẽ
}

/**
 * Setup the root state.
 */
const _disposer: Map<string, IDisposer | undefined> = new Map()
export async function setupRootStore(rootStore: RootStore | any) {
  for (const key in persistorConfig) {
    const { version, ...config } = persistorConfig[
      key as keyof RootStorePersistor
    ] as unknown as IPersistor<string>

    /**
     * The key we'll be saving our state as within async storage.
     */
    const keyWithVersion = `${key}-v${version}`

    try {
      // load the last known state from AsyncStorage
      const rehydrateStore = (await storage.load(keyWithVersion)) as RootStoreSnapshot | null

      if (rehydrateStore) {
        applySnapshot(
          rootStore[key],
          Object.assign({}, getSnapshot(rootStore[key]), rehydrateStore),
        )
      }
    } catch (e) {
      // if there's any problems loading, then inform the dev what happened
      if (__DEV__) {
        // console.tron.error?.((e as any).message, null);
      }
    }

    // stop tracking state changes if we've already setup
    if (_disposer.has(key)) _disposer.get(key)?.()

    // track changes & save to AsyncStorage
    _disposer.set(
      key,
      onSnapshot(rootStore[key], async (snapshot) => {
        let dataPersist: any = null

        if (config.whitelist) {
          if (config.whitelist.length > 0) {
            dataPersist = config.whitelist.reduce((prev, cur) => {
              // @ts-ignore
              return { ...prev, [cur]: snapshot[cur] }
            }, {})
          } else {
            dataPersist = Object.assign({}, snapshot)
          }
        }

        if (config.blacklist && config.blacklist.length > 0) {
          config.blacklist.forEach((key) => {
            delete dataPersist[key]
          })
        }

        storage.save(keyWithVersion, dataPersist)
      }),
    )
  }

  const unsubscribe = () => {
    _disposer.forEach((disposer) => {
      disposer?.()
    })
    _disposer.clear()
  }

  return { rootStore, unsubscribe }
}
