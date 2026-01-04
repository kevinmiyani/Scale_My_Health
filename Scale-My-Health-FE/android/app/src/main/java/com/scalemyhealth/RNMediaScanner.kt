package com.scalemyhealth

import android.media.MediaScannerConnection
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class RNMediaScanner(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "RNMediaScanner"
    }

    @ReactMethod
    fun scanFile(path: String, promise: Promise) {
        try {
            MediaScannerConnection.scanFile(
                reactApplicationContext,
                arrayOf(path),
                null
            ) { scannedPath, _ -> Log.d("MediaScanner", "File scanned: $scannedPath") }

            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("ERROR_SCANNING", e)
        }
    }
}