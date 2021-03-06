uniform sampler2D tex;

void main()
{
	float to = 0.001;
	vec2 coords = gl_TexCoord[0].st;

	vec4 tempcolor;
	
	tempcolor = texture2D(tex,vec2(coords.s, coords.t));
	vec3 P5n = tempcolor.rgb;

	tempcolor = texture2D(tex,vec2(coords.s-to, coords.t-to));
	float P1d = ((dot(P5n,tempcolor.rgb)/(length(P5n)*length(tempcolor.rgb)))+1)/2;
	tempcolor = texture2D(tex,vec2(coords.s, coords.t-to));
	float P2d = ((dot(P5n,tempcolor.rgb)/(length(P5n)*length(tempcolor.rgb)))+1)/2;		//(dot(P5n,tempcolor.rgb)+1)/2;
	tempcolor = texture2D(tex,vec2(coords.s+to, coords.t-to));
	float P3d = ((dot(P5n,tempcolor.rgb)/(length(P5n)*length(tempcolor.rgb)))+1)/2;

	tempcolor = texture2D(tex,vec2(coords.s-to, coords.t));
	float P4d = ((dot(P5n,tempcolor.rgb)/(length(P5n)*length(tempcolor.rgb)))+1)/2;
	tempcolor = texture2D(tex,vec2(coords.s+to, coords.t));
	float P6d = ((dot(P5n,tempcolor.rgb)/(length(P5n)*length(tempcolor.rgb)))+1)/2;

	tempcolor = texture2D(tex,vec2(coords.s-to, coords.t+to));
	float P7d = ((dot(P5n,tempcolor.rgb)/(length(P5n)*length(tempcolor.rgb)))+1)/2;
	tempcolor = texture2D(tex,vec2(coords.s, coords.t+to));
	float P8d = ((dot(P5n,tempcolor.rgb)/(length(P5n)*length(tempcolor.rgb)))+1)/2;
	tempcolor = texture2D(tex,vec2(coords.s+to, coords.t+to));
	float P9d = ((dot(P5n,tempcolor.rgb)/(length(P5n)*length(tempcolor.rgb)))+1)/2;


	float Gx = (P1d + 2.0*P2d + P3d) - (P7d + 2.0*P8d + P9d);
	float Gy = (P3d + 2.0*P6d + P9d) - (P1d + 2.0*P4d + P7d);

	float G = sqrt(Gx*Gx+Gy*Gy);

	vec4 newcolor;	// = vec4(G, G, G, 1.0);
	if(G<0.1)	newcolor = vec4(0.0, 0.0, 0.0, 1.0);
	else	newcolor = vec4(1.0, 1.0, 1.0, 1.0);
	gl_FragColor = newcolor;
}
