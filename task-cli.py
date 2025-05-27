import sys

def task_finder(cmd:list):
    match cmd[0]:
        case "add":
            task = cmd[1]

            return 0
        case "delete":
            return 0
        case "update":
            return 0
        case "list":
            return 0
        case "mark_in_progress":
            return 0
        case "mark_done":
            return 0
        case _:
            return -999
        
def read_all_task(task:str):
    f