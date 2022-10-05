package com.example.nearme_app

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView

class ProfileGuestActivity : AppCompatActivity() {
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile_guest)

        val inscription = findViewById<TextView>(R.id.inscriptionGuest)
        val connexion = findViewById<TextView>(R.id.connexionGuest)

        connexion.setOnClickListener {
            startActivity(Intent(this@ProfileGuestActivity, LoginActivity::class.java))
        }
        inscription.setOnClickListener {
            startActivity(Intent(this@ProfileGuestActivity, InscriptionActivity::class.java))
        }

    }
}