package com.example.nearme_app

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.nearme_app.R.*

class MotRecycleViewAdapter(val mots : MutableList<RecyclerView>)
    : RecyclerView.Adapter<MotRecycleViewAdapter.RecycleViewHolder>() {

    class RecycleViewHolder(val view: View) : RecyclerView.ViewHolder(view)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecycleViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(layout.logo, parent, false) as View
        return RecycleViewHolder(view)
    }

    override fun onBindViewHolder(holder: RecycleViewHolder, position: Int) {
        holder.view.findViewById<RecyclerView>(id.logo_loading) = this.mots[position]
    }

    override fun getItemCount(): Int {
        return this.mots.size
    }
}

class LoadingActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(layout.activity_loading)
        val rv = this.findViewById<RecyclerView>(id.logo_loading)
        rv.layoutManager = LinearLayoutManager(applicationContext)
    }
}