import { IocContext, RegisterOptions, KeyType } from '../IocContext'
import { getGlobalType, logger } from '../utils'

const context = IocContext.DefaultInstance

/**
 * register class
 * @param target need a class
 */
export function register(key?: KeyType, options?: RegisterOptions) {
    return function (target: any) {
        context.register(target, key, options)
    }
}

/**
 * register class
 * @param target need a class
 */
export function registerSubClass(key?: KeyType, options?: RegisterOptions) {
    return function (target: any) {
        context.register(target, key, {
            ...options, regInSuperClass: true
        })
    }
}

/**
 * inject
 * @param type class or string
 */
export function inject(type: any) {
    const globalType = getGlobalType(type)
    return function (target: any, key: any): void {
        target[key] = context.get(globalType)
        if (!target[key]) {
            logger.warn('Notfound:' + globalType)
        }
    }
}

/**
 * lazy inject
 * @param type class or string
 * @param always always read from context. default: false
 * @param subClass getSubClasses. default: false
 */
export function lazyInject(type: any, always = false, subClass = false) {
    const globalType = getGlobalType(type)
    return function (target: any, key: any): void {
        Object.defineProperty(target, key, {
            configurable: !always,
            get: () => {
                const data = subClass ? context.getSubClasses(globalType) : context.get(globalType)
                if (!data) {
                    logger.warn('Notfound:' + globalType)
                } else {
                    if (!always) {
                        Object.defineProperty(target, key, {
                            value: data
                        })
                    }
                }
                return data
            }
        })
    }
}