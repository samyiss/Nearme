package com.example.nearme_app

import android.annotation.SuppressLint
import android.content.ContentValues.TAG
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.google.android.material.textfield.TextInputEditText
import org.json.JSONObject

class LoginActivity : AppCompatActivity() {
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)


        val AllerInscription = findViewById<TextView>(R.id.allerInscription)

        

        val url = "http://192.168.0.133:3000/auth/token"
        val queue = Volley.newRequestQueue(this)


        AllerInscription.setOnClickListener {
            startActivity(Intent(this@LoginActivity, InscriptionActivity::class.java))

        }

        val AllerMain = findViewById<Button>(R.id.btnConnexion)

        AllerMain.setOnClickListener {
            var email = this.findViewById<TextInputEditText>(R.id.inputEmail).text
            var password = this.findViewById<TextInputEditText>(R.id.inputPassword).text

            val body = JSONObject()
            body.put("email", email)
            body.put("password", password)
            val postRequest = JsonObjectRequest(
                Request.Method.POST,
                url,
                body,
                {
                    Log.d("Jeton :", it.getString("token"))
                },
                {
                    val response = it.networkResponse
                    val jsonError = String(response.data)
                    val responseObject = JSONObject(jsonError)
                    Log.d(TAG, responseObject.getString("message"))
                }
            )
            queue.add(postRequest)
        }
    }
}