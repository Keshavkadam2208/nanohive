import nodemailer
from "nodemailer";


const transporter =
nodemailer.createTransport({

service:"gmail",

auth:{

user:
process.env.EMAIL_USER,

pass:
process.env.EMAIL_PASS

}

});


export const sendWelcomeEmail =
async(

to,
name

)=>{

const html = `

<div style="
font-family:Arial;
padding:20px;
background:#f4f4f4;
">

<div style="
max-width:600px;
margin:auto;
background:white;
padding:30px;
border-radius:10px;
">

<h1 style="
color:#111827;
">
Welcome to NanoHive 🚀
</h1>

<p>
Hi ${name},
</p>

<p>
Your creator journey starts here.
We're excited to have you on NanoHive.
</p>

<a
href="http://localhost:3000"
style="
display:inline-block;
padding:12px 20px;
background:#111827;
color:white;
text-decoration:none;
border-radius:6px;
"
>
Explore Campaigns
</a>

</div>

</div>

`;


await transporter.sendMail({

from:
process.env.EMAIL_USER,

to,

subject:
"Welcome to NanoHive 🚀",

html

});

};

//requested accepted mail funtion
export const sendAcceptanceEmail =

async(

to,
name,
campaignTitle

)=>{

const html = `

<div style="
font-family:Arial;
padding:20px;
background:#f4f4f4;
">

<div style="
max-width:600px;
margin:auto;
background:white;
padding:30px;
border-radius:10px;
">

<h1 style="
color:#16a34a;
">
Congratulations 🎉
</h1>

<p>
Hi ${name},
</p>

<p>
You have been selected for:
<b>${campaignTitle}</b>
</p>

<p>
Log in to NanoHive
to view campaign details.
</p>

</div>

</div>

`;

await transporter.sendMail({

from:
process.env.EMAIL_USER,

to,

subject:
"Campaign Application Accepted 🎉",

html

});

};

//request rejected mail function

export const sendRejectionEmail =

async(

to,
name,
campaignTitle

)=>{

const html = `

<div style="
font-family:Arial;
padding:20px;
background:#f4f4f4;
">

<div style="
max-width:600px;
margin:auto;
background:white;
padding:30px;
border-radius:10px;
">

<h1 style="
color:#dc2626;
">
Application Update
</h1>

<p>
Hi ${name},
</p>

<p>
Unfortunately,
you were not selected for:
<b>${campaignTitle}</b>
</p>

<p>
Don't worry —
more opportunities are coming 🚀
</p>

</div>

</div>

`;

await transporter.sendMail({

from:
process.env.EMAIL_USER,

to,

subject:
"Campaign Application Update",

html

});

};

//sendResetPaaswordEmail

export const sendResetPasswordEmail =
async(

to,
resetUrl

)=>{

const html = `

<div style="
font-family:Arial;
padding:20px;
background:#f4f4f4;
">

<div style="
max-width:600px;
margin:auto;
background:white;
padding:30px;
border-radius:10px;
">

<h1 style="
color:#111827;
">
Reset Your Password 🔐
</h1>

<p>
We received a request
to reset your password.
</p>

<p>
Click the button below
to continue:
</p>

<a
href="${resetUrl}"
style="
display:inline-block;
padding:12px 20px;
background:#111827;
color:white;
text-decoration:none;
border-radius:6px;
"
>
Reset Password
</a>

<p style="
margin-top:20px;
color:#666;
">
This link expires in
15 minutes.
</p>

</div>

</div>

`;

await transporter.sendMail({

from:
process.env.EMAIL_USER,

to,

subject:
"Reset Your NanoHive Password 🔐",

html

});

};