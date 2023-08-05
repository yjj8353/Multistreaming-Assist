// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::fs::File;
use std::path::Path;

// 기여자 리스트 읽어오기
#[tauri::command]
fn read_contributors(file_path: &str) -> String {
    let contents = fs::read_to_string(file_path)
        .expect("Should have been able to read the file");

    return contents
}

#[tauri::command]
fn write_nginx_conf(file_path: &str, data: &str) -> Result<bool, bool> {
    let path = Path::new(file_path);
    if path.exists() {
        let result = fs::write(file_path.to_owned() + "\\nginx.conf", data);
        let result = match result {
            Ok(_) => Ok(true),
            Err(_) => Err(false)
        };
        
        return result;
    } else {
        let result = File::create(file_path.to_owned() + "\\nginx.conf");
        let result = match result {
            Ok(_) => Ok(true),
            Err(_) => Err(false)
        };

        if result.is_err() {
            return  result;
        }

        let result = fs::write(file_path.to_owned() + "\\nginx.conf", data);
        let result = match result {
            Ok(_) => Ok(true),
            Err(_) => Err(false)
        };

        return result;
    }
}

#[tauri::command]
fn write_broadcast_option(file_path: &str, data: &str) -> Result<bool, bool> {
    let path = Path::new(file_path);
    if path.exists() {
        let result = fs::write(file_path.to_owned() + "\\broadcastOption.json", data);
        let result = match result {
            Ok(_) => Ok(true),
            Err(_) => Err(false)
        };

        return result;
    } else {
        let result = File::create(file_path.to_owned() + "\\broadcastOption.json");
        let result = match result {
            Ok(_) => Ok(true),
            Err(_) => Err(false)
        };

        if result.is_err() {
            return  result;
        }

        let result = fs::write(file_path.to_owned() + "\\broadcastOption.json", data);
        let result = match result {
            Ok(_) => Ok(true),
            Err(_) => Err(false)
        };

        return result;
    }
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![read_contributors, write_nginx_conf, write_broadcast_option])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
