function Input() { }

Input._pressed = { };

Input.isDown = function(keyCode) {
	return this._pressed[keyCode];
}
Input.isUp = function(keyCode) {
	return !this._pressed[keyCode];
}

Input.onKeydown = function(event) {
	this._pressed[event.keyCode] = true;
}
Input.onKeyup = function(event) {
	delete this._pressed[event.keyCode];
}

window.addEventListener('keyup', function(event) { Input.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Input.onKeydown(event); }, false);

// KEY CODES
Input.KEY_BACKSPACE = 8;
Input.KEY_TAB = 9;
Input.KEY_ENTER = 13;
Input.KEY_SHIFT = 16;
Input.KEY_CTRL = 17;
Input.KEY_ALT = 18;
Input.KEY_PAUSE = 19;
Input.KEY_CAPS_LOCK = 20;
Input.KEY_ESC = 27;
Input.KEY_PAGE_UP = 33;
Input.KEY_PAGE_DOWN = 34;
Input.KEY_END = 35;
Input.KEY_HOME = 36;
Input.KEY_LEFT = 37;
Input.KEY_UP = 38;
Input.KEY_RIGHT = 39;
Input.KEY_DOWN = 40;
Input.KEY_INSERT = 45;
Input.KEY_DELETE = 46;
Input.KEY_0 = 48;
Input.KEY_1 = 49;
Input.KEY_2 = 50;
Input.KEY_3 = 51;
Input.KEY_4 = 52;
Input.KEY_5 = 53;
Input.KEY_6 = 54;
Input.KEY_7 = 55;
Input.KEY_8 = 56;
Input.KEY_9 = 57;
Input.KEY_A = 65;
Input.KEY_B = 66;
Input.KEY_C = 67;
Input.KEY_D = 68;
Input.KEY_E = 69;
Input.KEY_F = 70;
Input.KEY_G = 71;
Input.KEY_H = 72;
Input.KEY_I = 73;
Input.KEY_J = 74;
Input.KEY_K = 75;
Input.KEY_L = 76;
Input.KEY_M = 77;
Input.KEY_N = 78;
Input.KEY_O = 79;
Input.KEY_P = 80;
Input.KEY_Q = 81;
Input.KEY_R = 82;
Input.KEY_S = 83;
Input.KEY_T = 84;
Input.KEY_U = 85;
Input.KEY_V = 86;
Input.KEY_W = 87;
Input.KEY_X = 88;
Input.KEY_Y = 89;
Input.KEY_Z = 90;
Input.KEY_LEFT_WIN_KEY = 91;
Input.KEY_RIGHT_WIN_KEY = 92;
Input.KEY_SELECT_KEY = 93;
Input.KEY_NUMPAD_0 = 96;
Input.KEY_NUMPAD_1 = 97;
Input.KEY_NUMPAD_2 = 98;
Input.KEY_NUMPAD_3 = 99;
Input.KEY_NUMPAD_4 = 100;
Input.KEY_NUMPAD_5 = 101;
Input.KEY_NUMPAD_6 = 102;
Input.KEY_NUMPAD_7 = 103;
Input.KEY_NUMPAD_8 = 104;
Input.KEY_NUMPAD_9 = 105;
Input.KEY_MULTIPLY = 106;
Input.KEY_ADD = 107;
Input.KEY_SUBTRACT = 109;
Input.KEY_DECIMAL_POINT = 110;
Input.KEY_DIVIDE = 111;
Input.KEY_F1 = 112;
Input.KEY_F2 = 113;
Input.KEY_F3 = 114;
Input.KEY_F4 = 115;
Input.KEY_F5 = 116;
Input.KEY_F6 = 117;
Input.KEY_F7 = 118;
Input.KEY_F8 = 119;
Input.KEY_F9 = 120;
Input.KEY_F10 = 121;
Input.KEY_F11 = 122;
Input.KEY_F12 = 123;
Input.KEY_NUM_LOCK = 144;
Input.KEY_SCROLL_LOCK = 145;
Input.KEY_SEMI_COLON = 186;
Input.KEY_EQUAL_SIGN = 187;
Input.KEY_COMMA = 188;
Input.KEY_DASH = 189;
Input.KEY_PERIOD = 190;
Input.KEY_FOWARD_SLASH = 191;
Input.KEY_GRAVE_ACCENT = 192;
Input.KEY_OPEN_BRACKET = 219;
Input.KEY_BACK_SLASH = 220;
Input.KEY_CLOSE_BRAKET = 221;
Input.KEY_SIGLE_QUOTE = 222;