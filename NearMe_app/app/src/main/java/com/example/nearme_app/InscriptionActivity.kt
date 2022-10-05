package com.example.nearme_app

import android.content.ContentValues
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.util.Patterns
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.google.android.material.textfield.TextInputEditText
import org.json.JSONObject

class InscriptionActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_inscription)

        val allerConnexion = findViewById<TextView>(R.id.allerInscription)
        val AllerMain = findViewById<Button>(R.id.btnConnexion)

        var nom = this.findViewById<EditText>(R.id.inputUsername)
        var email = this.findViewById<EditText>(R.id.inputEmail)
        var password = this.findViewById<EditText>(R.id.inputPassword)
        var telephone = this.findViewById<EditText>(R.id.inputPhone)
        var ConfirmPassword = this.findViewById<EditText>(R.id.inputConformPassword)

        allerConnexion.setOnClickListener {
            startActivity(Intent(this@InscriptionActivity, LoginActivity::class.java))
        }

        AllerMain.setOnClickListener {
            var nomTxt = this.findViewById<EditText>(R.id.inputUsername).text.toString()
            var emailTxt = this.findViewById<EditText>(R.id.inputEmail).text.toString()
            var passwordTxt = this.findViewById<EditText>(R.id.inputPassword).text.toString()
            var telephoneTxt = this.findViewById<EditText>(R.id.inputPhone).text.toString()
            var ConfirmPasswordTxt = this.findViewById<EditText>(R.id.inputConformPassword).text.toString()

            if (validName(nomTxt) == true || validEmail(emailTxt) == true  || validPassword(passwordTxt,ConfirmPasswordTxt) == true  || validPhone(telephoneTxt)==true) {
                inscription(nomTxt, emailTxt, ConfirmPasswordTxt, telephoneTxt)
            }
            else {
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

    private fun validPassword(passwordTxt: String,confirmPasswordTxt:String): Boolean?
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
        else if(passwordTxt != confirmPasswordTxt){
            password.error = "Must be identique"
            return false
        }
        else {
            password.error = null
            return true
        }
    }

    private fun validPhone(phoneTxt:String): Boolean?
    {
        var telephone = this.findViewById<EditText>(R.id.inputPhone)

        return if(!phoneTxt.matches(".*[0-9].*".toRegex())) {
            telephone.error = "Must be all Digits"
            false
        } else if(phoneTxt.length != 10) {
            telephone.error = "Must be 10 Digits"
            false
        } else {
            telephone.error = null
            true

        }
    }

    private fun validName(nomTxt:String): Boolean?
    {
        var nom = this.findViewById<EditText>(R.id.inputUsername)

        return if(nomTxt.isEmpty()) {
            nom.error = "Veuillez Remplir le champs"
            false
        } else {
            nom.error = null
            true

        }
    }

    private fun inscription(nom: String, email: String, password: String, telephone: String){
            val queue = Volley.newRequestQueue(this)
            val url = "http://localhost:3000/auth/register"

            val body = JSONObject()
            body.put("email_user", nom)
            body.put("password", password)
            body.put("Tel", telephone)
            body.put("nom_user", email)
            val postRequest = JsonObjectRequest(
                Request.Method.POST,
                url,
                body,
                {
                    Log.d("=Response :", it.toString())

                    if (it.has("success")) {
                        val success: String = it.getString("success")
                        if (success == "true") {
                            Toast.makeText(this, "Register Success!", Toast.LENGTH_SHORT).show()
                            startActivity(
                                Intent(
                                    this@InscriptionActivity,
                                    LoginActivity::class.java
                                )
                            )
                        } else {
                            Toast.makeText(
                                this,
                                "Register fail!, Veuillez verifier les champs",
                                Toast.LENGTH_SHORT
                            ).show()
                        }
                    }
                },
                {
                    val response = it.networkResponse
                    val jsonError = String(response.data)
                    val responseObject = JSONObject(jsonError)
                    Log.d(ContentValues.TAG, responseObject.getString("message"))
                }
            )
            queue.add(postRequest)
        }
    }


