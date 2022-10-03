package com.example.nearme_app

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView

class InscriptionActivity : AppCompatActivity() {
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_inscription)

        val AllerConnexion = findViewById<TextView>(R.id.AllerConnexion)

        AllerConnexion.setOnClickListener {
            startActivity(Intent(this@InscriptionActivity, loginActivity::class.java))
        }
    }
}