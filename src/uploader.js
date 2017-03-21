"use strict"

import providers from "./providers"
import errors from "./errors"

export default async function upload(path, provider, options) {
    if(provider in providers) {
        return providers[provider](path, options.auth[provider])
    }
    else {
        throw errors.PROVIDER_NOT_FOUND
    }
}
