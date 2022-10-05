package com.example.nearme_app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AnimationUtils
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.nearme_app.R.*

class LoadingActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(layout.activity_loading)
        val logoLoading = findViewById<ImageView>(R.id.logoLoading)
        val textLoading = findViewById<TextView>(R.id.textLoading)

        val topAnimation = AnimationUtils.loadAnimation(this, R.anim.top)
        val botAnimation = AnimationUtils.loadAnimation(this, R.anim.bot)

        logoLoading.startAnimation(topAnimation)
        textLoading.startAnimation(botAnimation)

        val splashScreenTimeOut = 4000
        val homeIntent = Intent(this@LoadingActivity, MainActivity::class.java)

        Handler().postDelayed({
            startActivity(homeIntent)
            finish()
        }, splashScreenTimeOut.toLong())

    }
}