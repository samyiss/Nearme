package com.example.nearme_app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageView

class profileloggedinActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.profileloggedin)

        val resetPass = findViewById<ImageView>(R.id.resetPassword)
        val updateProfile = findViewById<ImageView>(R.id.updateProfile)

        resetPass.setOnClickListener {
            startActivity(Intent(this@profileloggedinActivity, ChangerDeMotsDePasseActivity::class.java))
        }
    }
}