' Inicia o Rohnelt Code Hub Agent em segundo plano (sem janela de console).
' Usado pela tarefa agendada "RohneltCodeHubAgent" no logon do Windows.
Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = "C:\Users\felip\Documents\Rohnelt\agent"
shell.Run "cmd /c """"C:\Program Files\nodejs\node.exe"" src\index.js > agent.log 2> agent.err.log""", 0, False
