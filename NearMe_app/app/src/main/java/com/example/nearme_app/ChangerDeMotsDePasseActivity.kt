package com.example.nearme_app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject

class ChangerDeMotsDePasseActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_changer_de_mots_de_passe)

        val url = url+"update-password"
        val queue = Volley.newRequestQueue(this)
        val envoyer = findViewById<Button>(R.id.sendUpdate)
        envoyer.setOnClickListener {
            var passwordTxt = this.findViewById<EditText>(R.id.inputOldPassword).text.toString()
            var new_passwordTxt = this.findViewById<EditText>(R.id.inputNewPassword).text.toString()
            var Confpassword = this.findViewById<EditText>(R.id.inputVerificationPassword).text.toString()

            if (validPassword(new_passwordTxt, Confpassword)==true) {
                val body = JSONObject()
                body.put("password", passwordTxt)
                body.put("new_password", passwordTxt)
                val postRequest = JsonObjectRequest(
                    Request.Method.POST,
                    url,
                    body,
                    {
                        val msg = it.getString("message")
                        Toast.makeText(applicationContext, msg, Toast.LENGTH_LONG).show()
                        startActivity(Intent(this@ChangerDeMotsDePasseActivity, profileloggedinActivity::class.java))
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
}