import sys
import pyautogui
size = pyautogui.size()
x, y = pyautogui.position()


def changepos(posx, posy):
    pyautogui.moveTo(x+posx, y+posy, duration=0)


eval(sys.argv[1])
