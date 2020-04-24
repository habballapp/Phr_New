package com.medproject;

import android.app.Application;

import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.goodatlas.audiorecord.RNAudioRecordPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.douglasjunior.reactNativeGetLocation.ReactNativeGetLocationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.rnfs.RNFSPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.tkporter.sendsms.SendSMSPackage;
import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.reactnative.camera.RNCameraPackage;

import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;

import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import com.reactlibrary.RNNavybitsDateTimePickerPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FBSDKPackage(),
            new RNAudioRecordPackage(),
            new RNGoogleSigninPackage(), // <-- this needs to be in the list

            new RNSoundPackage(),
            new ReactNativeAudioPackage(),
            new DocumentPickerPackage(),
            new RNFSPackage(),
            new RNCameraPackage(),
            new ReactNativePushNotificationPackage(),
            SendSMSPackage.getInstance(),
            new ReactNativeGetLocationPackage(),
            new RNFirebasePackage(),
            new AsyncStoragePackage(),
            new RNGestureHandlerPackage(),
            new ReanimatedPackage(),
            new LinearGradientPackage(),
            new SplashScreenReactPackage(),
            new VectorIconsPackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new MapsPackage(),
            new RNDateTimePickerPackage(),
            new RNFirebaseStoragePackage(),
            new RNFileViewerPackage(),
            new RNNavybitsDateTimePickerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
