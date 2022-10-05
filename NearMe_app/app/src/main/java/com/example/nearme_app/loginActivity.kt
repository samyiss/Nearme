package com.example.nearme_app

import android.annotation.SuppressLint
import android.content.ContentValues.TAG
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.util.Patterns
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject

class LoginActivity : AppCompatActivity() {

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val AllerInscription = findViewById<TextView>(R.id.allerInscription)
        AllerInscription.setOnClickListener {
            startActivity(Intent(this@LoginActivity, InscriptionActivity::class.java))
        }

        val oublie = this.findViewById<TextView>(R.id.MotDePasseOublié)
        oublie.setOnClickListener {
            startActivity(Intent(this@LoginActivity, MotsDePasseOublierActivity::class.java))
        }

        val url = url+"auth/token"
        val queue = Volley.newRequestQueue(this)
        val AllerMain = findViewById<Button>(R.id.btnConnexion)
        AllerMain.setOnClickListener {
            var emailTxt = this.findViewById<EditText>(R.id.PasswordEmail).text.toString()
            var passwordTxt = this.findViewById<EditText>(R.id.inputPassword).text.toString()

            if (validEmail(emailTxt) == true && validPassword(passwordTxt)==true) {
                val body = JSONObject()
                body.put("email", emailTxt)
                body.put("password", passwordTxt)
                val postRequest = JsonObjectRequest(
                    Request.Method.POST,
                    url,
                    body,
                    {
                        startActivity(Intent(this@LoginActivity, MainActivity::class.java))
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
            else{
                return@setOnClickListener
            }
        }
    }

    private fun validEmail(emailTxt: String): Boolean? {
        var email = this.findViewById<EditText>(R.id.PasswordEmail)
        return if(!Patterns.EMAIL_ADDRESS.matcher(emailTxt).matches()) {
            email.error = "Invalid Email Address"
            false
        } else{
            this.findViewById<EditText>(R.id.PasswordEmail).error = null
            true
        }
    }

    private fun validPassword(passwordTxt: String): Boolean?
    {
        var password = this.findViewById<EditText>(R.id.inputPassword)
        if(passwordTxt.length < 8)
        {
            password.error = "Minimum 8 Character Password"
            return false
        }
        else if(!passwordTxt.matches(".*[A-Z].*".toRegex()))
        {
            password.error = "Must Contain 1 Upper-case Character"
            return false
        }
        else if(!passwordTxt.matches(".*[a-z].*".toRegex()))
        {
            password.error = "Must Contain 1 Lower-case Character"
            return false
        }
        else if(!passwordTxt.matches(".*[@#\$%^&+=-_].*".toRegex()))
        {
            password.error = "Must Contain 1 Special Character (@#\$%^&+=)"
            return false
        }
        else {
            password.error = null
            return true
        }
    }
}