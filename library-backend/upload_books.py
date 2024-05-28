import sqlite3

def get_db_connection():
    conn = sqlite3.connect('library.db')
    conn.row_factory = sqlite3.Row
    return conn

def add_book(title, author, genre, published_date, file_path):
    conn = get_db_connection()
    cursor = conn.cursor()

    with open(file_path, 'rb') as file:
        blob_data = file.read()

    cursor.execute('''
        INSERT INTO books (title, author, genre, published_date, file)
        VALUES (?, ?, ?, ?, ?)
    ''', (title, author, genre, published_date, blob_data))

    conn.commit()
    conn.close()

if __name__ == "__main__":
    books = [
         ("iOS Auto Layout Demystified, 2nd Edition-Addison-Wesley", "Erica Sadun", "Computers\\Programming", "2023-01-01", "/Users/apple/Downloads/Erica Sadun - iOS Auto Layout Demystified, 2nd Edition-Addison-Wesley (2013).pdf"),
        # ("Book Title 2", "Author 2", "Genre 2", "2023-01-01", "path/to/book2.pdf"),
        # ("Book Title 3", "Author 3", "Genre 3", "2023-01-01", "path/to/book3.pdf"),
        # ("Book Title 4", "Author 4", "Genre 4", "2023-01-01", "path/to/book4.pdf"),
        # ("Book Title 5", "Author 5", "Genre 5", "2023-01-01", "path/to/book5.pdf"),
    ]

    for book in books:
        add_book(*book)
        print(f"Added {book[0]} to the database.")
