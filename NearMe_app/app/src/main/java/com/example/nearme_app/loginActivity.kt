package com.example.nearme_app

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView

class loginActivity : AppCompatActivity() {
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val AllerInscription = findViewById<TextView>(R.id.AllerInscription)

        AllerInscription.setOnClickListener {
            startActivity(Intent(this@loginActivity, InscriptionActivity::class.java))

        }

        val AllerMain = findViewById<Button>(R.id.Connexion)

        AllerMain.setOnClickListener {
            startActivity(Intent(this@loginActivity, MainActivity::class.java))
        }
    }
}