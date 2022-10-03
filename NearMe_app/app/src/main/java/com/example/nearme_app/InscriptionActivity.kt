package com.example.nearme_app

import android.content.Intent
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class InscriptionActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_inscription)

        val allerConnexion = findViewById<TextView>(R.id.allerInscription)

        allerConnexion.setOnClickListener {
            startActivity(Intent(this@InscriptionActivity, LoginActivity::class.java))
        }
    }
}