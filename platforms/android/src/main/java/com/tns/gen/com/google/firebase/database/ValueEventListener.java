package com.tns.gen.com.google.firebase.database;

public class ValueEventListener implements com.google.firebase.database.ValueEventListener {
	public ValueEventListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onDataChange(com.google.firebase.database.DataSnapshot param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onDataChange", void.class, args);
	}

	public void onCancelled(com.google.firebase.database.DatabaseError param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onCancelled", void.class, args);
	}

}
