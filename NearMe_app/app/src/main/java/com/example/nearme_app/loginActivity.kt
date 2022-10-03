package com.example.nearme_app

import android.annotation.SuppressLint
import android.content.ContentValues.TAG
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import com.android.volley.NetworkResponse
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.google.android.material.textfield.TextInputEditText
import org.json.JSONObject

class loginActivity : AppCompatActivity() {
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
<<<<<<< HEAD

        val AllerInscription = findViewById<TextView>(R.id.)
=======
        
        val AllerInscription = findViewById<TextView>(R.id.allerInscription)
>>>>>>> FrontEnd
        val AllerInscription = findViewById<TextView>(R.id.AllerInscription)
        val url = "http://192.168.0.133:3000/auth/token"
        val queue = Volley.newRequestQueue(this)


        AllerInscription.setOnClickListener {
            startActivity(Intent(this@loginActivity, InscriptionActivity::class.java))

        }

        val AllerMain = findViewById<Button>(R.id.btnConnexion)

        AllerMain.setOnClickListener {
            var email = this.findViewById<TextInputEditText>(R.id.email).text
            var password = this.findViewById<TextInputEditText>(R.id.password).text

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