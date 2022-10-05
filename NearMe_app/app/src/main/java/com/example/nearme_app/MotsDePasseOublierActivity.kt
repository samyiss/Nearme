package com.example.nearme_app

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.google.android.material.textfield.TextInputEditText
import org.json.JSONObject

class MotsDePasseOublierActivity : AppCompatActivity() {
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_mots_de_passe_oublier)
        var continuer = this.findViewById<Button>(R.id.send)

        val url = "http://192.168.0.133:3000/forget-password/"
        val queue = Volley.newRequestQueue(this)

        continuer.setOnClickListener {
            var email = this.findViewById<TextInputEditText>(R.id.PasswordEmail).text

            val body = JSONObject()
            val postRequest = JsonObjectRequest(
                Request.Method.POST,
                url+email,
                body,
                {
                    Toast.makeText(applicationContext, it.getString("message"), Toast.LENGTH_LONG).show()
                    startActivity(Intent(this@MotsDePasseOublierActivity, LoginActivity::class.java))
                },
                {
                    val response = it.networkResponse
                    val jsonError = String(response.data)
                    val msg = JSONObject(jsonError).getString("message")
                    Toast.makeText(applicationContext, msg, Toast.LENGTH_LONG).show()
                }
            )
            queue.add(postRequest)
        }
    }
}