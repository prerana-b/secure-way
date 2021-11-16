import pyautogui
import time
print("Auto Typing")
print()
time.sleep(3)
print("Writing starts")
print()
time.sleep(1)

# with open("D:\\Study material\\NIIT\\Pythonfile\\Linklist\\typeautomate.txt", 'r') as file:
with open("typeautomate.txt", 'r') as file:
    text = file.read()

pyautogui.write(text)
# for i in range(len(text)):
# 	pyautogui.typewrite(text[i])
print("----------Content----------")
print(text)
print("----------Content----------")
print()
input("----------Copy Done----------")
