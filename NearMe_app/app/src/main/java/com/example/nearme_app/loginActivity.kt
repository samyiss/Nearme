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
        var email = this.findViewById<EditText>(R.id.inputEmail)
        var password = this.findViewById<EditText>(R.id.inputPassword)

        

        val url = "http://192.168.0.133:3000/auth/token"
        val queue = Volley.newRequestQueue(this)


        AllerInscription.setOnClickListener {
            startActivity(Intent(this@LoginActivity, InscriptionActivity::class.java))

        }

        val AllerMain = findViewById<Button>(R.id.btnConnexion)

        AllerMain.setOnClickListener {
            var emailTxt = this.findViewById<EditText>(R.id.inputEmail).text.toString()
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
            else{
                return@setOnClickListener
            }
        }
    }

    private fun validEmail(emailTxt: String): Boolean? {
        var email = this.findViewById<EditText>(R.id.inputEmail)
        return if(!Patterns.EMAIL_ADDRESS.matcher(emailTxt).matches()) {
            email.error = "Invalid Email Address"
            false
        } else{
            this.findViewById<EditText>(R.id.inputEmail).error = null
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
        else if(!passwordTxt.matches(".*[@#\$%^&+=].*".toRegex()))
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