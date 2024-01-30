// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sysinfo::{System, Process};
use tauri::http::method::Method;
use std::{fs, path::Path};
use serde::{Deserialize, Serialize};
use reqwest;


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn get_lockfile_path() -> Result<String, String> {
    let system = System::new_all();

    let processes = system.processes_by_exact_name("LeagueClientUx.exe").collect::<Vec<&Process>>();
    if processes.len() == 0 {
        return Err("Error".into());
    }

    let process = processes.first().unwrap();
    let lockfile_path = Path::new(process.cwd().unwrap()).join("lockfile");
    return Ok(lockfile_path.display().to_string());
}

#[tauri::command]
async fn read_file_from_path(path: String) -> Result<String, String> {
    let file_content = fs::read_to_string(path)
        .expect("Should have been able to read the file");
    println!("{}", file_content);
    return Ok(file_content);
}

#[tauri::command]
async fn check_if_path_is_file(path: String) -> Result<bool, ()> {
    return Ok(Path::new(&path).is_file());
}

#[derive(Serialize, Deserialize)]
struct JSResponse {
  data: String,
  status: u16
}

#[tauri::command]
async fn send_http_request(url: String, method: String, token: String, body: Option<String>) -> Result<String, ()> {
    let client = reqwest::Client::builder()
        .danger_accept_invalid_certs(true)
        .build()
        .unwrap();

    let request = client.request(Method::from_bytes(method.as_bytes()).unwrap(), url)
                        .body(body.unwrap_or(String::from("")));

    let response = request.header("Accept", "application/json")
                        .header("Authorization", format!("Basic {}", token))
                        .send()
                        .await
                        .unwrap();

    let test = JSResponse {
      status: response.status().as_u16(),
      data: response.text().await.unwrap()
    };

    return Ok(serde_json::to_string(&test).unwrap());
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_lockfile_path, check_if_path_is_file, read_file_from_path, send_http_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
